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
    if (endTime.substr(2,2) == '60'){
        endTime = (Number(endTime.substr(0,2))+1)*100+'00'
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

const parse = function(text, callback) {
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

            callback(result);
        })
    }catch(e){
        console.log('Morphological Analysys Error : ',e);
    }


}

module.exports = (app) => {
    dotenv.load({silent: true});

    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({ extended: true });

    app.post('/api/mpAnalysis', jsonParser, (request, response) => {

        var srcText = request.body.input;
        var entities = request.body.entities;
        let res = [];

        var rsvrDay = _paddingZero(new Date().getFullYear()) + _paddingZero(new Date().getMonth()+1) + _paddingZero(new Date().getDate());
        var rsvrTFH = '';
        var rsvrTFM = '';
        var rsvrTTH = '';
        var rsvrTTM = '';
        var rsvrDayInsertFlag = false;
        var rsvrTimeInsertFlag = false;
        var tmpLocation = '';

        parse(srcText, (result)=>{
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

            //날짜,시간 추출
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
                            let now = _paddingZero(new Date().getHours()) + ':' + _paddingZero(new Date().getMinutes());
                            if(Number(v.value.split(':')[0]) < 9 && v.value.split(':')[0]+':'+v.value.split(':')[1] < now){
                                rsvrTFH = Number(v.value.split(':')[0]) + 12;
                            }else{
                                rsvrTFH = Number(v.value.split(':')[0]);
                            }
                            rsvrTFM = v.value.split(':')[1];
                            rsvrTimeInsertFlag = true;
                        }
                    }
                }
            });

            //기본 회의시간은 1시간
            var meetTime = '0100';

            //회의시간 추출
            res.map((v,i)=>{
                if(v.pos == 'SN'){
                    if (_nextWord(res,v.word) == '분' && _nextWord(res,v.word,2) == '동안'){
                        meetTime = '30';
                    }else if (_nextWord(res,v.word) == '시간' && _nextWord(res,v.word,2) == '동안'){
                        meetTime = v.word+'00';
                    }else if (_nextWord(res,v.word) == '시간' && _nextWord(res,v.pos,2) == 'SN' && _nextWord(res,v.word,3)=='분' && _nextWord(res,v.word,4) == '동안' ||
                              _nextWord(res,v.word) == '시간' && _nextWord(res,v.word,2) == '반' && _nextWord(res,v.word,3)=='동안'){
                        meetTime = v.word+'30';
                    }
                }else if(v.pos == 'MM'){
                    let t = v.word=='한'?1:v.word=='두'?2:v.word=='세'?3:v.word=='네'?4:0;
                    if (_nextWord(res,v.word) == '분' && _nextWord(res,v.word,2) == '동안'){
                        meetTime = '30';
                    }else if (_nextWord(res,v.word) == '시간' && _nextWord(res,v.word,2) == '동안'){
                        meetTime = t+'00';
                    }else if (_nextWord(res,v.word) == '시간' && _nextWord(res,v.pos,2) == 'SN' && _nextWord(res,v.word,3)=='분' && _nextWord(res,v.word,4) == '동안' ||
                              _nextWord(res,v.word) == '시간' && _nextWord(res,v.word,2) == '반' && _nextWord(res,v.word,3)=='동안'){
                        meetTime = t+'30';
                    }
                }
            })

            //회의시간 셋팅
            rsvrTTH = _calTime(rsvrTFH, rsvrTFM, meetTime).substr(0,2);
            rsvrTTM = _calTime(rsvrTFH, rsvrTFM, meetTime).substr(2,2);

            //기본 회의제목 셋팅
            var meetingTitle = '파트 회의';

            let resp = {
                meetingTitle : meetingTitle,
                rsvrDay : rsvrDay,
                rsvrTFH : rsvrTFH,
                rsvrTFM : rsvrTFM,
                rsvrTTH : rsvrTTH,
                rsvrTTM : rsvrTTM
            }

            response.send(resp)
        });
    });
};
