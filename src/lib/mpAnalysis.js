const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const fs = require('fs');

var Settings = require("../models/settings");
var Users = require("../models/users");

const run_cmd = function(cmd, args, callback){
    const { spawn } = require('child_process');
    const child = spawn(cmd, args);
    var resp = '';

    child.stdout.on('data', (buffer) => { resp += buffer.toString() });
    child.stdout.on('end', () => { callback(resp) });
}

const _paddingZero = function(num){
    if (parseInt(num) < 10){
        return '0' + parseInt(num);
    }else{
        return '' + parseInt(num);
    }
}

const _calTime = function(startTime, startMin, time){
    let endTime = Number(startTime)*100+Number(startMin)+Number(time)+'';
    endTime = endTime.length==4?endTime:'0'+endTime;
    if (endTime.substr(-2) == '60'){
        endTime = (Number(endTime.substr(0,2))+1)*100;
        if(endTime < 1000){
            return '0' + endTime;
        }else{
            return '' + endTime;
        }
    }else{
        if(Number(endTime) == 30){
            return '00' + Number(endTime);
        }else if(Number(endTime) < 1000){
            return '0' + Number(endTime);
        }else{
            return '' + Number(endTime);
        }
    }
}

const _nextTime = function(time){
    let hour = Number(time.substr(0,2));
    let min = Number(time.substr(2,2));
    if(min == 30){
        hour = hour + 1;
        min = 0;
    }else{
        min = 30;
    }

    return _paddingZero(hour)+_paddingZero(min);
}

const _prevWord = function(sentence, word, cnt){
    cnt = cnt==undefined?1:cnt;
    let idx = sentence.findIndex((item)=>{
        return item.word === word;
    })
    return sentence[idx-cnt].word;
}

const _nextWord = function(sentence, word, cnt){
    cnt = cnt==undefined?1:cnt;
    let idx = sentence.findIndex((item)=>{
        return item.word === word;
    })
    return sentence[idx+cnt].word;
}

const _findPrevMP = function(sentence, word, mp, w, l){
    var p = l==undefined?1:l;
    let t = 1;
    let idx = sentence.findIndex((item)=>{
        if (item.word == word){
            if (t == p){
                return true;
            }else{
                t++;
            }
        }
    });
    let result = {};
    for (let i=idx-1 ; i>=0 ; i--){
        if(sentence[i].pos == mp && (w == undefined || sentence[i].word == w)){
            result = sentence[i];
            result.loc = i;
            break;
        }
    }
    return result;
}

const _findFirstMP = function(sentence, word, mp, w){
    let result = {};
    for (let i=0 ; i<sentence.length ; i++){
        if(sentence[i].pos == mp && (w == undefined || sentence[i].word == w)){
            result = sentence[i];
            result.loc = i;
            break;
        }
    }
    return result;
}

const _findNextMP = function(sentence, word, mp){
    let idx = sentence.findIndex((item)=>{
        return item.word == word;
    });
    let result = {};
    for (let i=idx+1 ; i<sentence.length ; i++){
        if(sentence[i].pos == mp){
            result = sentence[i];
            result.loc = i;
            break;
        }
    }
    return result;
}

const _findLastMP = function(sentence, word, mp, w){
    let result = {};
    for (let i=sentence.length-1 ; i>=0 ; i--){
        if(sentence[i].pos == mp && (w == undefined || sentence[i].word == w)){
            result = sentence[i];
            result.loc = i;
            break;
        }
    }
    return result;
}

const _calPrevLength = function(sentence, loc){
    let cnt = 0;
    sentence.forEach((v,i)=>{
        if(i < loc){
            cnt+=v.word.length;
        }
    });
    return cnt;
}

const _originalLoc = function(sentence){
    var newSentence = [];
    for (let i=0 ; i<sentence.length ; i++){
        if (sentence[i] != ' '){
            let tmp = {char:sentence[i], loc:i};
            newSentence.push(tmp);
        }
    }
    return newSentence;
}

const parse = function(text) {

    return new Promise((resolve, reject)=>{
        fs.writeFileSync('TMP_INPUT_FILE',text,'UTF-8');

        let res = [];

        try{
            run_cmd('mecab.exe', ['-o', 'TMP_OUTPUT_FILE', 'TMP_INPUT_FILE'], (text) => {
                res = fs.readFileSync('TMP_OUTPUT_FILE', 'UTF-8');
                res = res.replace(/\r/g,'').replace(/\s+$/,'');
                var lines = res.split('\n');

                var result = lines.map((line)=>{
                    return line.replace('\t', ',').split(',');
                })

                resolve(result);
            })
        }catch(e){
            reject(e);
        }
    });
}

module.exports = (app) => {
    dotenv.load({silent: true});

    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({ extended: true });

    var meetingTitle = '';
    var meetTime = '';

    app.post('/api/mpAnalysis', jsonParser, (request, response) => {

        Settings.find({user:process.env.LOGIN_ID}, (e, settingData)=>{
            meetingTitle = settingData[0].title;
            meetTime = settingData[0].duration;

            var srcText = request.body.input;
            var srcTextArr = _originalLoc(srcText);
            var entities = request.body.entities;
            let res = [];

            var rsvrDay = _paddingZero(new Date().getFullYear()) + _paddingZero(new Date().getMonth()+1) + _paddingZero(new Date().getDate());
            var rsvrTFH = '';
            var rsvrTFM = '';
            var rsvrTTH = '';
            var rsvrTTM = '';
            var apDist = '';
            var rsvrDayInsertFlag = false;
            var rsvrTimeInsertFlag = false;
            var tmpLocation = '';
            var room = '';

            parse(srcText).then((result)=>{
                // console.log('------start------')
                for (let i in result){
                    let word = result[i][0];
                    let pos = result[i][1];
                    if(word == 'EOS') continue;
                    res.push({
                        word : word,
                        pos : pos
                    });
                    // console.log(word," : ",pos);
                }
                // console.log('------end------\n\n')
                var now = _paddingZero(new Date().getHours()) + ':' + _paddingZero(new Date().getMinutes());
                rsvrTFH = now.substr(0,2);
                if (now.substr(-2)<'10'){
                    rsvrTFM = '00';
                }else if (now.substr(-2)>='10' && now.substr(-2)<'40'){
                    rsvrTFM = '30';
                }else{
                    rsvrTFM = '00';
                    rsvrTFH = _paddingZero(Number(rsvrTFH)+1);
                }

                //날짜,시간,회의실 추출
                entities.map((v,i)=>{
                    if (v.entity == 'sys-date'){
                        if (!rsvrDayInsertFlag){
                            rsvrDay = v.value.replace(/-/gi,'');
                            tmpLocation  = v.location[0]+':'+v.location[1];
                            rsvrDayInsertFlag = true;
                        }
                    }else if(v.entity == 'sys-time' && Number(v.value.split(':')[0]) > 0){
                        if (!rsvrTimeInsertFlag){
                            if (v.location[0]+':'+v.location[1] != tmpLocation){
                                if(Number(v.value.split(':')[0]) < 9 && v.value.split(':')[0]+':'+v.value.split(':')[1] < now){
                                    rsvrTFH = _paddingZero(Number(v.value.split(':')[0]) + 12);
                                }else{
                                    rsvrTFH = _paddingZero(Number(v.value.split(':')[0]));
                                }
                                rsvrTFM = v.value.split(':')[1];
                                rsvrTimeInsertFlag = true;
                            }
                        }
                    }else if(v.entity == 'meetingRoom'){
                        room = v.value;
                    }
                });

                var prevMp = {};
                var firstMP = _findFirstMP(res,'"','SY','"');
                var lastMP = _findLastMP(res,'"','SY','"');
                if (JSON.stringify(firstMP)=='{}'){firstMP.pos = 0}
                if (JSON.stringify(lastMP)=='{}'){lastMP.pos = res.length}
                let titlePrior = 0;

                //회의시간/제목 추출
                res.map((v,i)=>{
                    if (i > firstMP.pos && i < lastMP.pos){
                        //오전/오후일 경우 판단
                        if(v.word == '오전' && (res[i+1].word == '에' || res[i+2].word == '에')) {
                            apDist = 'AM';
                        }else if(v.word == '오후' && (res[i+1].word == '에' || res[i+2].word == '에')) {
                            apDist = 'PM';
                        //회의시간 추출
                        }else if(v.pos == 'SN'){
                            if (res[i+1].word == '분' && res[i+2].word == '동안'){
                                meetTime = '30';
                            }else if (res[i+1].word == '시간' && res[i+2].word == '동안'){
                                meetTime = v.word+'00';
                            }else if (res[i+1].word == '시간' && _nextWord(res,v.pos,2) == 'SN' && res[i+3].word=='분' && res[i+4].word == '동안' ||
                                      res[i+1].word == '시간' && res[i+2].word == '반' && res[i+3].word=='동안'){
                                meetTime = v.word+'30';
                            }else if (res[i+1].word == '시' && res[i+2].word == '반' && (res[i+3].word == '회의' || res[i+3].word == '에' || res[i+3].word == '부터')){
                                if (Number(v.word)<9){
                                    rsvrTFH = _paddingZero((Number(v.word)+12));
                                }else{
                                    rsvrTFH = _paddingZero(v.word);
                                }
                                rsvrTFM = '30';
                            }
                        }else if(v.pos == 'MM'){
                            let t = v.word=='한'?1:v.word=='두'?2:v.word=='세'?3:v.word=='네'?4:0;
                            if (res[i+1].word == '분' && res[i+2].word == '동안'){
                                meetTime = '30';
                            }else if (res[i+1].word == '시간' && res[i+2].word == '동안'){
                                meetTime = _paddingZero(t)+'00';
                            }else if (res[i+1].word == '시간' && _nextWord(res,v.pos,2) == 'SN' && res[i+3].word=='분' && res[i+4].word == '동안' ||
                                      res[i+1].word == '시간' && res[i+2].word == '반' && res[i+3].word=='동안'){
                                meetTime = _paddingZero(t)+'30';
                            }else if (res[i+1].word == '시' && res[i+2].word == '반' && (res[i+3].word == '회의' || res[i+3].word == '에' || res[i+3].word == '부터')){
                                if (t<9){
                                    rsvrTFH = _paddingZero(t+12);
                                }else{
                                    rsvrTFH = _paddingZero(t);
                                }
                                rsvrTFM = '30';
                            }
                        }
                    }
                    //회의제목 추출
                    if (titlePrior < 2 && (v.pos == 'VCP+ETM' || v.pos == 'ETM')){
                        if (res[i+1].word == '이름' || res[i+1].word == '제목' || res[i+1].word == '회의' || res[i+1].word == '주제' || res[i+1].word == '명' || res[i+2].word == '이름' || res[i+2].word == '제목' || res[i+2].word == '회의' || res[i+2].word == '주제' || res[i+2].word == '명' ){
                            if (res[i+2].word == '으로' || res[i+3].word == '으로' || res[i+2].word == '로'){
                                prevMp = _findPrevMP(res,v.word,'JKB','에');
                                let tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc;
                                let tmpI = i;
                                if(res[i-1].word == '이' && res[i-1].pos == 'VCP') tmpI--;
                                if(_findPrevMP(res,v.word,'JX','부터').loc > tmpLoc){
                                    prevMp = _findPrevMP(res,v.word,'JX','부터');
                                    tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc;
                                }
                                if(_findPrevMP(res,v.word,'NNG','동안').loc > tmpLoc){
                                    prevMp = _findPrevMP(res,v.word,'NNG','동안');
                                }

                                if(JSON.stringify(prevMp) == '{}'){
                                    meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, 0)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, 0)].loc);
                                    titlePrior = 2;
                                }else{
                                    meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, prevMp.loc+1)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, prevMp.loc+1)].loc);
                                    titlePrior = 2;
                                }
                            }
                        }
                    }else if (titlePrior < 3 && (v.pos == 'VCP+EC' || (v.pos == 'EC' && v.word == '라고') || (v.pos == 'JKB' && v.word == '로') || (v.pos == 'JKB' && v.word == '으로'))){
                        prevMp = _findPrevMP(res,v.word,'JKB','에');
                        let tmpLoc = 0;
                        if ((res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '시') || (res[prevMp.loc-1].pos == 'NNG' && res[prevMp.loc-1].word == '반') || (res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '분')){
                            tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc;
                        }
                        let tmpI = i;

                        if(res[i-1].word == '이' && res[i-1].pos == 'VCP') tmpI--;
                        if(_findPrevMP(res,v.word,'JX','부터').loc > tmpLoc){
                            if ((res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '시') || (res[prevMp.loc-1].pos == 'NNG' && res[prevMp.loc-1].word == '반') || (res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '분')){
                                prevMp = _findPrevMP(res,v.word,'JX','부터');
                                tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc;
                            }
                        }
                        if(_findPrevMP(res,v.word,'NNG','동안').loc > tmpLoc){
                            if ((res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '분') || (res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '시간')){
                                prevMp = _findPrevMP(res,v.word,'NNG','동안');
                                tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc;
                            }
                        }
                        if(_findFirstMP(res,v.word,'NNG','제목').loc >= tmpLoc){
                            prevMp = _findFirstMP(res,v.word,'NNG','제목');
                            if (res[prevMp.loc+1].word == '이' || res[prevMp.loc+1].word == '은' || res[prevMp.loc+1].word == '을'){
                                var tmp = prevMp.loc+1;
                                prevMp = res[tmp];
                                prevMp.loc = tmp;
                                tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc+1;
                            }
                        }
                        if(_findFirstMP(res,v.word,'NNG','주제').loc >= tmpLoc){
                            prevMp = _findFirstMP(res,v.word,'NNG','주제');
                            if (res[prevMp.loc+1].word == '가' || res[prevMp.loc+1].word == '는' || res[prevMp.loc+1].word == '를'){
                                var tmp = prevMp.loc+1;
                                prevMp = res[tmp];
                                prevMp.loc = tmp;
                                tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc+1;
                            }
                        }
                        if(_findFirstMP(res,v.word,'NNG','회의').loc >= tmpLoc){
                            prevMp = _findFirstMP(res,v.word,'NNG','회의');
                            if (res[prevMp.loc+1].word == '명' || res[prevMp.loc+1].word == '주제' || res[prevMp.loc+1].word == '이름' || res[prevMp.loc+1].word == '제목'){
                                if (res[prevMp.loc+2].word == '가' || res[prevMp.loc+2].word == '는' || res[prevMp.loc+2].word == '를' || res[prevMp.loc+2].word == '이' || res[prevMp.loc+2].word == '은' || res[prevMp.loc+2].word == '을'){
                                    var tmp = prevMp.loc+2;
                                    prevMp = res[tmp];
                                    prevMp.loc = tmp;
                                }
                            }
                        }
                        if(JSON.stringify(prevMp) == '{}'){
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, 0)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, 0)].loc);
                            titlePrior = 3;
                        }else{
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, prevMp.loc+1)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, prevMp.loc+1)].loc);
                            titlePrior = 3;
                        }
                    }else if (titlePrior < 1 && (v.pos == 'SC' && v.word == ',')){
                        prevMp = _findPrevMP(res,v.word,'JKB','에');
                        let tmpLoc = 0;
                        if ((res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '시') || (res[prevMp.loc-1].pos == 'NNG' && res[prevMp.loc-1].word == '반') || (res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '분')){
                            tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc;
                        }
                        let tmpI = i;
                        if(_findPrevMP(res,v.word,'JX','부터').loc > tmpLoc){
                            if ((res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '시') || (res[prevMp.loc-1].pos == 'NNG' && res[prevMp.loc-1].word == '반') || (res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '분')){
                                prevMp = _findPrevMP(res,v.word,'JX','부터');
                                tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc;
                            }
                        }
                        if(_findPrevMP(res,v.word,'NNG','동안').loc > tmpLoc){
                            if ((res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '분') || (res[prevMp.loc-1].pos == 'NNBC' && res[prevMp.loc-1].word == '시간')){
                                prevMp = _findPrevMP(res,v.word,'NNG','동안');
                                tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc;
                            }
                        }
                        if(_findFirstMP(res,v.word,'NNG','제목').loc >= tmpLoc){
                            prevMp = _findFirstMP(res,v.word,'NNG','제목');
                            if (res[prevMp.loc+1].word == '이' || res[prevMp.loc+1].word == '은' || res[prevMp.loc+1].word == '을'){
                                var tmp = prevMp.loc+1;
                                prevMp = res[tmp];
                                prevMp.loc = tmp;
                                tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc+1;
                            }
                        }
                        if(_findFirstMP(res,v.word,'NNG','주제').loc >= tmpLoc){
                            prevMp = _findFirstMP(res,v.word,'NNG','주제');
                            if (res[prevMp.loc+1].word == '가' || res[prevMp.loc+1].word == '는' || res[prevMp.loc+1].word == '를'){
                                var tmp = prevMp.loc+1;
                                prevMp = res[tmp];
                                prevMp.loc = tmp;
                                tmpLoc = JSON.stringify(prevMp)=='{}'?0:prevMp.loc+1;
                            }
                        }
                        if(_findFirstMP(res,v.word,'NNG','회의').loc >= tmpLoc){
                            prevMp = _findFirstMP(res,v.word,'NNG','회의');
                            if (res[prevMp.loc+1].word == '명' || res[prevMp.loc+1].word == '주제' || res[prevMp.loc+1].word == '이름' || res[prevMp.loc+1].word == '제목'){
                                if (res[prevMp.loc+2].word == '가' || res[prevMp.loc+2].word == '는' || res[prevMp.loc+2].word == '를' || res[prevMp.loc+2].word == '이' || res[prevMp.loc+2].word == '은' || res[prevMp.loc+2].word == '을'){
                                    var tmp = prevMp.loc+2;
                                    prevMp = res[tmp];
                                    prevMp.loc = tmp;
                                }
                            }
                        }
                        if(JSON.stringify(prevMp) == '{}'){
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, 0)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, 0)].loc);
                            titlePrior = 1;
                        }else{
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, prevMp.loc+1)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, prevMp.loc+1)].loc);
                            titlePrior = 1;
                        }
                    }else if (titlePrior < 4 && (v.pos == 'SY' && v.word == '"')){
                        prevMp = _findPrevMP(res,v.word,'SY','"',2);
                        if (JSON.stringify(prevMp)!='{}'){
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, firstMP.loc+1)].loc,srcTextArr[_calPrevLength(res, lastMP.loc)].loc-srcTextArr[_calPrevLength(res, firstMP.loc+1)].loc);
                            titlePrior = 4;
                        }
                    }
                })

                //회의시간 셋팅
                rsvrTTH = _calTime(rsvrTFH, rsvrTFM, meetTime).substr(0,2);
                rsvrTTM = _calTime(rsvrTFH, rsvrTFM, meetTime).substr(2,2);

                let resp = {
                    meetingTitle : meetingTitle,
                    rsvrDay : rsvrDay,
                    rsvrTFH : rsvrTFH,
                    rsvrTFM : rsvrTFM,
                    rsvrTTH : rsvrTTH,
                    rsvrTTM : rsvrTTM,
                    room : room,
                    apDist : apDist
                }

                response.send(resp)
            },(err)=>{
                console.log('(mpAnalysis)Morphological Analysys Error : ',err);
            });
        });
    });

    app.post('/api/mpAnalysisTitle', jsonParser, (request, response) => {
        Settings.find({user:process.env.LOGIN_ID}, (e, settingData)=>{
            var meetingTitle = settingData[0].title;

            var srcText = request.body.input;
            var srcTextArr = _originalLoc(srcText);
            let res = [];

            parse(srcText).then((result)=>{
                // console.log('------start------')
                for (let i in result){
                    let word = result[i][0];
                    let pos = result[i][1];
                    if(word == 'EOS') continue;
                    res.push({
                        word : word,
                        pos : pos
                    });
                    // console.log(word," : ",pos);
                }

                var firstMp = {};

                //회의제목 추출
                res.map((v,i)=>{
                    if (v.pos == 'VCP+EC' || (v.pos == 'EC' && v.word == '라고')){
                        firstMp = _findFirstMP(res,v.word,'JKO');

                        let tmpI = i;
                        if(res[i-1].word == '이' && res[i-1].pos == 'VCP') tmpI--;
                        if(res[i+1].word == '회의' || res[i+1].word == '제목' || res[i+1].word == '이름' || res[i+1].word == '주제'){
                            firstMp = {};
                        }
                        if(JSON.stringify(firstMp) == '{}'){
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, 0)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, 0)].loc);
                        }else{
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, firstMp.loc+1)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, firstMp.loc+1)].loc);
                        }
                    }else if ((v.pos == 'JKB' && v.word == '으로') || (v.pos == 'JKB' && v.word == '로')){
                        firstMp = _findFirstMP(res,v.word,'JKO');

                        let tmpI = i;
                        if(res[i-1].word == '제목' || res[i-1].word == '주제' || res[i-1].word == '이름' || res[i-1].word == '명') tmpI--;
                        if(res[i-2].word == '라는') tmpI--
                        if(res[i-3].word == '이' && res[i-3].pos == 'VCP') tmpI--;
                        if(res[i+1].word == '회의' || res[i+1].word == '제목' || res[i+1].word == '이름' || res[i+1].word == '주제'){
                            firstMp = {};
                        }
                        if(JSON.stringify(firstMp) == '{}'){
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, 0)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, 0)].loc);
                        }else{
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, firstMp.loc+1)].loc,srcTextArr[_calPrevLength(res, tmpI)].loc-srcTextArr[_calPrevLength(res, firstMp.loc+1)].loc);
                        }
                    }
                })

                let resp = {
                    meetingTitle : meetingTitle
                }

                response.send(resp)
            },(err)=>{
                console.log('(mpAnalysisTitle)Morphological Analysys Error : ',err);
            });
        });
    });

    app.post('/api/mpAnalysisTime', jsonParser, (request, response) => {
        Settings.find({user:process.env.LOGIN_ID}, (e, settingData)=>{
            var meetingTime = settingData[0].duration;

            var srcText = request.body.input;
            let res = [];

            parse(srcText).then((result)=>{
                // console.log('------start------')
                for (let i in result){
                    let word = result[i][0];
                    let pos = result[i][1];
                    if(word == 'EOS') continue;
                    res.push({
                        word : word,
                        pos : pos
                    });
                    // console.log(word," : ",pos);
                }

                let compString = ['으로','동안','이','을'];

                //회의시간 추출
                res.map((v,i)=>{
                    //회의시간 추출
                    if(v.pos == 'SN'){
                        if (res[i+1].word == '분' && (res[i+2] == undefined || -1<compString.join().indexOf(res[i+2].word))){
                            meetingTime = '0030';
                        }else if (res[i+1].word == '시간' && (res[i+2] == undefined || -1<compString.join().indexOf(res[i+2].word))){
                            meetingTime = _paddingZero(v.word)+'00';
                        }else if (res[i+1].word == '시간' && _nextWord(res,v.pos,2) == 'SN' && res[i+3].word=='분' && (res[i+4] == undefined || -1<compString.join().indexOf(res[i+4].word)) ||
                                  res[i+1].word == '시간' && res[i+2].word == '반' && (res[i+3] == undefined || -1<compString.join().indexOf(res[i+3].word))){
                            meetingTime = _paddingZero(v.word)+'30';
                        }
                    }else if(v.pos == 'MM'){
                        let t = v.word=='한'?1:v.word=='두'?2:v.word=='세'?3:v.word=='네'?4:0;
                        if (res[i+1].word == '분' && (res[i+2] == undefined || -1<compString.join().indexOf(res[i+2].word))){
                            meetingTime = '0030';
                        }else if (res[i+1].word == '시간' && (res[i+2] == undefined || -1<compString.join().indexOf(res[i+2].word))){
                            meetingTime = _paddingZero(t)+'00';
                        }else if (res[i+1].word == '시간' && _nextWord(res,v.pos,2) == 'SN' && res[i+3].word=='분' && (res[i+4] == undefined || -1<compString.join().indexOf(res[i+4].word)) ||
                                  res[i+1].word == '시간' && res[i+2].word == '반' && (res[i+3] == undefined || -1<compString.join().indexOf(res[i+3].word))){
                            meetingTime = _paddingZero(t)+'30';
                        }
                    }
                })

                let resp = {
                    meetingTime : meetingTime
                }

                response.send(resp)
            },(err)=>{
                console.log('(mpAnalysisTime)Morphological Analysys Error : ',err);
            });
        });
    });

    app.post('/api/mpAnalysisUser', jsonParser, (request, response) => {

            var srcText = request.body.input;
            var loginUserName = request.body.userName;
            let res = [];
            let user = '';

            parse(srcText).then((result)=>{
                // console.log('------start------')
                for (let i in result){
                    let word = result[i][0];
                    let pos = result[i][1];
                    if(word == 'EOS') continue;
                    res.push({
                        word : word,
                        pos : pos
                    });
                    // console.log(word," : ",pos);
                }

                //UserName추출
                res.map((v,i)=>{


                    if(v.pos == 'JKS' || v.pos == 'JKG'){
                        if(res[i-1].word != '선임' && res[i-1].word != '수석' && res[i-1].word != '책임' && res[i-1].word != '이사'){
                            if(res[i-1].word.length < 3){
                                if(res[i-1].pos == 'NP'){
                                    userName = loginUserName ;  // 내 + 가,
                                    console.log("mpAnalysisUser result userName : " + userName);
                                }else{
                                  userName = res[i-2].word + res[i-1].word ;  // 육민 + 형 + 이,
                                  console.log("mpAnalysisUser result userName : " + userName);
                                }
                            }else{
                               userName = res[i-1].word ;                  // 조기수 + 가, 조민호 + 가
                               console.log("mpAnalysisUser result userName : " + userName);
                            }
                        }else{
                            if(res[i-2].word.length < 3){
                                userName = res[i-3].word + res[i-2].word ;  // 육민 + 형 + 선임 + 이,
                                console.log("mpAnalysisUser result userName : " + userName);
                            }else{
                                userName = res[i-2].word ;                  // 조민호 + 선임 + 이, 조기수 + 수석 + 이
                                console.log("mpAnalysisUser result userName : " + userName);
                            }
                        }
                    }
                })

                Users.find({name:userName}, (e, userData)=>{
                    var myRsvrUserId = userData[0].id;
                    var myRsvrUserName = userData[0].name;

                    let resp = {
                        myRsvrUserId : myRsvrUserId, myRsvrUserName : myRsvrUserName
                    }
                    response.send(resp)
                },(err)=>{
                console.log('(mpAnalysisUser)Morphological Analysys Error : ',err);
            });

        });

    });

};
