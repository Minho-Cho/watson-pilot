const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const fs = require('fs');

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
            return '00' + endTime;
        }else if(endTime < 1000){
            return '0' + endTime;
        }else{
            return '' + endTime;
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

const _findPrevMP = function(sentence, word, mp, w){
    let idx = sentence.findIndex((item)=>{
        return item.word === word;
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

const _findNextMP = function(sentence, word, mp){
    let idx = sentence.findIndex((item)=>{
        return item.word === word;
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

const _calPrevLength = function(sentence, loc){
    let cnt = 0;
    sentence.map((v,i)=>{
        if(i < loc){
            cnt+=v.word.length;
            console.log(v.word);
            console.log(v.word.length);
        }
    });
    console.log('cnt => ' + cnt);
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



    app.post('/api/cancelAnalysis', jsonParser, (request, response) => {

            var srcText = request.body.input;
            var srcTextArr = _originalLoc(srcText);
            var entities = request.body.entities;
            let res = [];

            var meetingTitle = '';
            var meetTime = '';
            var rsvrDay = '';
            var rsvrTFH = '';
            var rsvrTFM = '';
            var apDist = '';
            var rsvrDayInsertFlag = false;
            var rsvrTimeInsertFlag = false;
            var tmpLocation = '';
            var room = '';

            parse(srcText).then((result)=>{
                 console.log('------start------')
                for (let i in result){
                    let word = result[i][0];
                    let pos = result[i][1];
                    if(word == 'EOS') continue;
                    res.push({
                        word : word,
                        pos : pos
                    });
                     console.log(word," : ",pos);
                }
                 console.log('------end------\n\n')
                var now = _paddingZero(new Date().getHours()) + ':' + _paddingZero(new Date().getMinutes());

                //날짜,시간,회의실 추출
                entities.map((v,i)=>{
                    if (v.entity == 'sys-date'){
                        if (!rsvrDayInsertFlag){
                            rsvrDay = v.value.replace(/-/gi,'');
                            tmpLocation  = v.location[0]+':'+v.location[1];
                            rsvrDayInsertFlag = true;
                        }
                    }else if(v.entity == 'sys-time'){
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

                //제목 추출
                res.map((v,i)=>{
                    if(v.pos == 'XSN' || v.pos == 'NNG'){
                        console.log(res[i]);
                        if(res[i+1].word == '이름' || res[i+1].word == '제목' || res[i+1].word == '명' || res[i+1].word == '타이틀' || res[i+1].word == '주제'){
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, 0)].loc,srcTextArr[_calPrevLength(res, i+1)].loc-srcTextArr[_calPrevLength(res, 0)].loc);
                        }else if(res[i].word == '이름' || res[i].word == '제목' || res[i].word == '명' || res[i].word == '타이틀' || res[i].word == '주제'){
                            meetingTitle = srcText.substr(srcTextArr[_calPrevLength(res, 0)].loc,srcTextArr[_calPrevLength(res, i)].loc-srcTextArr[_calPrevLength(res, 0)].loc);
                        }

                    }
                })

                console.log('rsvrDay    =>   ' + rsvrDay);
                console.log('meetingTitle    =>   ' + meetingTitle);

                let resp = {
                    meetingTitle : meetingTitle,
                    rsvrDay : rsvrDay,
                    rsvrTFH : rsvrTFH,
                    rsvrTFM : rsvrTFM,
                    room : room,
                    apDist : apDist
                }

                response.send(resp)

            },(err)=>{
                console.log('Morphological Analysys Error : ',err);
            });
    });
};
