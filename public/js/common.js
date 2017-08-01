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

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

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
            return parseInt(num);
        }
    }

    function makeTimeTable(fh, fm, th, tm){
        var tt = '';
        for (var i=fh;i<=th;i++){
            if (fh == th){
                tt = fh+'00,'+fh+'30';
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

    function ableRoomInfo(room, data, startTime, endTime){
        var roomInfo = JSON.parse(room);
        Common.sortJsonArrayByProperty(roomInfo, 'MR_NM');
        JSON.parse(data).map((v,i)=>{
            let tmp = Common.makeTimeTable(v.RSVR_FR_HH, v.RSVR_FR_MI, v.RSVR_TO_HH, v.RSVR_TO_MI);
            if(tmp.indexOf(startTime) > -1){
                let idx = roomInfo.findIndex((item)=>{
                    return item.MR_REG_NO === v.MR_REG_NO;
                })
                roomInfo.splice(idx,1);
            }
        })

        roomInfo.pop({MR_REG_NO : 'ICTSTMTR'}); //예외처리

        return roomInfo;
    }

    function getTimeInfoAuto(room, data, entities, input){
        var temp = input.text
        console.log("::::: data :::::",data)
        console.log("::::: entities :::::")
        entities.map((v,i)=>{
            console.log(v.entity, ' : ',v.value, '(',temp.substr(0,v.location[0]),'[',temp.substr(v.location[0],Number(v.location[1])-Number(v.location[0])),']',temp.substr(v.location[1],temp.length),')' )
        })
        console.log("::::: input :::::",input)

        // var dt = new Date();
        var rsvrDay = new Date().format('yyyyMMdd');
        var roomCode = '';
        var rsvrTFH = '';
        var rsvrTFM = '';
        var rsvrTTH = '';
        var rsvrTTM = '';
        var rsvrDayInsertFlag = false;
        var rsvrTimeInsertFlag = false;
        var tmpLocation = '';

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
                        let now = new Date().format("HH:mm");
                        if(Number(v.value.split(':')[0]) < 9 && v.value.split(':')[0]+':'+v.value.split(':')[1] < now){
                            rsvrTFH = Number(v.value.split(':')[0]) + 12;
                        }else{
                            rsvrTFH = Number(v.value.split(':')[0]);
                        }
                        rsvrTFM = v.value.split(':')[1];
                    }
                }
            }
        });
        
        //기본 회의시간은 1시간
        rsvrTTH = Number(rsvrTFH) + 1;
        rsvrTTM = rsvrTFM;

        //기본 회의제목 셋팅
        var meetingTitle = '파트 회의';

        //해당시간에 가능한 회의실이 있는지 확인
        var roomInfos = ableRoomInfo(room, data, rsvrTFH + rsvrTFM, rsvrTTH + rsvrTTM);
        // console.log("roomInfos : ",roomInfos)
        if (roomInfos.length == 0){
            return {};
        }
        var roomInfo = roomInfos[0];

        var timeInfo = {
            roomName : roomInfo.MR_NM,
			roomTitle : meetingTitle,
            roomCode : roomInfo.MR_REG_NO,
            rsvrDay : rsvrDay,
			TFH : rsvrTFH,
			TFM : rsvrTFM,
			TTH : rsvrTTH,
			TTM : rsvrTTM,
        }
        // console.log("timeInfo : ",timeInfo)
        return timeInfo;
    }

    return {
      sortJsonArrayByProperty: sortJsonArrayByProperty,
      paddingZero: _paddingZero,
      makeTimeTable: makeTimeTable,
      getTimeInfoAuto: getTimeInfoAuto
    };
}());
