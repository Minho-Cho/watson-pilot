Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.lpad = function(padLength, padString){
    var s = this;
    while(s.length < padLength)
        s = padString + s;
    return s;
};

String.prototype.rpad = function(padLength, padString){
    var s = this;
    while(s.length < padLength)
        s += padString;
    return s;
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

Array.prototype.delete = function(key, value){
    let idx = 0;
    this.map((v,i)=>{ if(v[key] === value){
        this.splice(idx,1);
    }else{
        idx++;
    }});
    return this;
};

Array.prototype.remove = function(key, value){
    let newArray = new Array();
    this.map((v,i)=>{ if(v[key] !== value) newArray.push(v)});
    return newArray;
}

var Common = (function() {

    function sortJsonArrayByProperty(objArray, prop, direction){
      if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
      var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending

      if (objArray && objArray.constructor===Array){
          var propPath = (prop.constructor===Array) ? prop : prop.split(".");
          objArray.sort(function(a,b){
              for (var p in propPath){
                  if (a[propPath[p]] && b[propPath[p]]){
                      a = a[propPath[p]];
                      b = b[propPath[p]];
                  }
              }
              // convert numeric strings to integers
              a = a.match(/^\d+$/) ? +a : a;
              b = b.match(/^\d+$/) ? +b : b;
              return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
          });
      }
    }

    function _paddingZero(num){
        if (parseInt(num) < 10){
            return '0' + parseInt(num);
        }else{
            return '' + parseInt(num);
        }
    }

    function _calTime(startTM, time){
        let startTime = startTM.substr(0,2);
        let startMin = startTM.substr(2,2);
        let endTime = Number(startTime)*100+Number(startMin)+Number(time)+'';
        if (endTime.substr(-2) == '60'){
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

    function _calTimeR(startTime, startMin, endTime, endMin){
        if (startMin == endMin){
            return _paddingZero(Number(Number(endTime) - Number(startTime)))+'00';
        }else if(startMin == '00'){
            return _paddingZero(Number(Number(endTime) - Number(startTime)))+'30';
        }else{
            return _paddingZero(Number(Number(endTime) - Number(startTime) - 1))+'30';
        }
    }

    function _nextTime(time){
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

    function _prevWord(sentence, word, cnt){
        cnt = cnt==undefined?1:cnt;
        let idx = sentence.findIndex((item)=>{
            return item.word === word;
        })
        return sentence[idx-cnt].word;
    }

    function _nextWord(sentence, word, cnt){
        cnt = cnt==undefined?1:cnt;
        let idx = sentence.findIndex((item)=>{
            return item.word === word;
        })
        return sentence[idx+cnt].word;
    }

    function makeTimeTable(fh, fm, th, tm){
        var tt = '';
        for (var i=fh;i<=th;i++){
            if (fh == th){
                tt = fh+'00';
            }else{
                if(fm == '00'){
                    if(tm == '00'){
                        if (_paddingZero(i)==fh){
                            tt += _paddingZero(i)+'00,'+_paddingZero(i)+'30';
                        }else if (_paddingZero(i)!=th){
                            tt += ','+_paddingZero(i)+'00,'+_paddingZero(i)+'30';
                        }else if (_paddingZero(i)==th){

                        }
                    }else if (tm == '30'){
                        if (_paddingZero(i)==fh){
                            tt += _paddingZero(i)+'00,'+_paddingZero(i)+'30';
                        }else if (_paddingZero(i)!=th){
                            tt += ','+_paddingZero(i)+'00,'+_paddingZero(i)+'30';
                        }else if (_paddingZero(i)==th){
                            tt += ','+_paddingZero(i)+'00';
                        }
                    }
                }else if(fm == '30'){
                    if(tm == '00'){
                        if (_paddingZero(i)==fh){
                            tt += _paddingZero(i)+'30';
                        }else if (_paddingZero(i)!=th){
                            tt += ','+_paddingZero(i)+'00,'+_paddingZero(i)+'30';
                        }else if (_paddingZero(i)==th){

                        }
                    }else if (tm == '30'){
                        if (_paddingZero(i)==fh){
                            tt += _paddingZero(i)+'30';
                        }else if (_paddingZero(i)!=th){
                            tt += ','+_paddingZero(i)+'00,'+_paddingZero(i)+'30';
                        }else if (_paddingZero(i)==th){
                            tt += ','+_paddingZero(i)+'00';
                        }
                    }
                }
            }
        }
        return tt;
    }

    function ableRoomInfo(room, data, startTime, endTime, target){
        // console.log('방정보',room)
        // console.log('가능회의실 판단------',data,'-----',startTime,'------',endTime,'-----',target)
        var roomInfo = JSON.parse(room);
        var temp = JSON.parse(JSON.stringify(roomInfo));
        if (target != ''){
            temp.map((v,i)=>{
                if (v.MR_REG_NO != target){
                    roomInfo.delete('MR_REG_NO', v.MR_REG_NO);
                }
            });
        }
        Common.sortJsonArrayByProperty(roomInfo, 'MR_NM');
        JSON.parse(data).map((v,i)=>{
            let tmp = Common.makeTimeTable(v.RSVR_FR_HH, v.RSVR_FR_MI, v.RSVR_TO_HH, v.RSVR_TO_MI);

            // startTime~endTime 동안 비어있는지 확인
            let thisTime = startTime;
            while (thisTime < endTime){
                if(tmp.indexOf(thisTime) > -1){
                    let idx = roomInfo.findIndex((item)=>{
                        // console.log(thisTime,'------',item)
                        // if(item.MR_REG_NO === v.MR_REG_NO) console.log(thisTime,'에 ',item.MR_NM,'탈락');
                        return item.MR_REG_NO === v.MR_REG_NO;
                    })
                    if (idx > -1) roomInfo.splice(idx,1);
                }
                thisTime = _nextTime(thisTime);
            }
        })

        roomInfo.delete('MR_REG_NO', 'ICTSTMTR'); //예외처리

        return roomInfo;
    }

    function getTimeInfoAuto(room, data, entities, input){
        var inputText = input.text
        // console.log("::::: room :::::",room)
        // console.log("::::: data :::::",data)
        // console.log("::::: entitieroom:::")
        // console.log("::::: entities :::::")
        // entities.map((v,i)=>{
        //     console.log(v.entity, ' : ',v.value, '(',inputText.substr(0,v.location[0]),'[',inputText.substr(v.location[0],Number(v.location[1])-Number(v.location[0])),']',inputText.substr(v.location[1],inputText.length),')' )
        // })
        // console.log("::::: input :::::",input)

        return new Promise((resolve, reject) => {
            //형태소 분석
            fetch('/api/mpAnalysis',{
                headers: new Headers({'Content-Type': 'application/json'}),
                method : 'POST',
                body : JSON.stringify({input:inputText, entities:entities})
            }).then((response) => {
                return response.text();
            }).then((response) => {
                console.log('morphological analysis result : ',response);
                var result = JSON.parse(response);
                let period = _calTimeR(result.rsvrTFH, result.rsvrTFM, result.rsvrTTH, result.rsvrTTM);
                var roomInfos = {};

                //해당시간에 예약가능한 회의실이 있는지 확인
                if(result.apDist == 'AM'){
                    let thisTime = new Date().format('HHmm');
                    if (thisTime < '0900') thisTime = '0900';
                    if(thisTime.substr(-2)>'10' && thisTime.substr(-2)<='40'){
                        thisTime = thisTime.substr(0,2)+'30';
                    }else if(thisTime.substr(-2)<='10'){
                        thisTime = thisTime.substr(0,2)+'00';
                    }else if(thisTime.substr(-2)>='40'){
                        thisTime = _paddingZero(Number(thisTime.substr(0,2))+1)+'00';
                    }
                    if (thisTime > '1130') thisTime = '1130';
                    while(thisTime != '1130'){
                        roomInfos = ableRoomInfo(room, data, thisTime, _calTime(thisTime, period), result.room);
                        if (JSON.stringify(roomInfos) != '{}'){
                            result.rsvrTFH = thisTime.substr(0,2);
                            result.rsvrTFM = thisTime.substr(2,2);
                            result.rsvrTTH = _calTime(thisTime, period).substr(0,2);
                            result.rsvrTTM = _calTime(thisTime, period).substr(2,2);
                            break;
                        }else{
                            thisTime = _calTime(thisTime, '0030');
                        }
                    }
                }else if (result.apDist == 'PM'){
                    let thisTime = new Date().format('HHmm');
                    if (thisTime < '1300') thisTime = '1300';
                    if(thisTime.substr(-2)>'10' && thisTime.substr(-2)<='40'){
                        thisTime = thisTime.substr(0,2)+'30';
                    }else if(thisTime.substr(-2)<='10'){
                        thisTime = thisTime.substr(0,2)+'00';
                    }else if(thisTime.substr(-2)>='40'){
                        thisTime = _paddingZero(Number(thisTime.substr(0,2))+1)+'00';
                    }
                    if (thisTime > '1700') thisTime = '1700';
                    while(thisTime != '1700'){
                        roomInfos = ableRoomInfo(room, data, thisTime, _calTime(thisTime, period), result.room);
                        if (JSON.stringify(roomInfos) != '{}'){
                            result.rsvrTFH = thisTime.substr(0,2);
                            result.rsvrTFM = thisTime.substr(2,2);
                            result.rsvrTTH = _calTime(thisTime, period).substr(0,2);
                            result.rsvrTTM = _calTime(thisTime, period).substr(2,2);
                            break;
                        }else{
                            thisTime = _calTime(thisTime, '0030');
                        }
                    }
                }else{
                    roomInfos = ableRoomInfo(room, data, result.rsvrTFH + result.rsvrTFM, result.rsvrTTH + result.rsvrTTM, result.room);
                }

                //  console.log("roomInfos : ",roomInfos)
                if (JSON.stringify(roomInfos) == '{}' || roomInfos.length == 0){
                    if (result.room == ''){
                        reject('NN');
                    }else{
                        reject('NT');
                    }
                }else{
                    var roomInfo = roomInfos[0];

                    var timeInfo = {
                        roomName : roomInfo.MR_NM,
            			roomTitle : result.meetingTitle,
                        roomCode : roomInfo.MR_REG_NO,
                        rsvrDay : result.rsvrDay,
            			TFH : result.rsvrTFH,
            			TFM : result.rsvrTFM,
            			TTH : result.rsvrTTH,
            			TTM : result.rsvrTTM,
                    }
                    // console.log("timeInfo : ",timeInfo)
                    resolve(timeInfo);
                }
            })
        });
    }

    function getTimeDate(entities, input){
        var inputText = input.text

        return new Promise((resolve, reject) => {
            //형태소 분석
            fetch('/api/mpAnalysis',{
                headers: new Headers({'Content-Type': 'application/json'}),
                method : 'POST',
                body : JSON.stringify({input:inputText, entities:entities})
            }).then((response) => {
                return response.text();
            }).then((response) => {
                console.log('morphological analysis result : ',response);
                var result = JSON.parse(response);

                var timeDate = {
                    rsvrDay : result.rsvrDay,
                    TFH : result.rsvrTFH,
                    TFM : result.rsvrTFM
                }
                resolve(timeDate);
            })
        });
    }

    function getTitle(entities, input){
        var inputText = input.text

        return new Promise((resolve, reject) => {
            //형태소 분석
            fetch('/api/mpAnalysisTitle',{
                headers: new Headers({'Content-Type': 'application/json'}),
                method : 'POST',
                body : JSON.stringify({input:inputText, entities:entities})
            }).then((response) => {
                return response.text();
            }).then((response) => {
                console.log('morphological analysis result : ',response);
                var result = JSON.parse(response);

                var title = {
                    meetingTitle : result.meetingTitle
                }
                resolve(title);
            })
        });
    }

    return {
      sortJsonArrayByProperty: sortJsonArrayByProperty,
      paddingZero: _paddingZero,
      makeTimeTable: makeTimeTable,
      getTimeInfoAuto: getTimeInfoAuto,
      getTitle: getTitle,
      getTimeDate: getTimeDate
    };
}());
