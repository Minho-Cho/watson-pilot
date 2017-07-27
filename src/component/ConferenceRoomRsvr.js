import React from 'react';

const timeTable = ['0700', '0730', '0800', '0830', '0900', '0930', '1000', '1030', '1100',
	               '1130', '1200', '1230', '1300', '1330', '1400', '1430', '1500', '1530',
	               '1600', '1630', '1700', '1730', '1800', '1830', '1900', '1930', '2000', '2030'];

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

export default class ConferenceRoomRsvr extends React.Component {

    render(){
        const mapToComponents = (data) => {
            if (data.content == '' || data.content==null || data.content==undefined) return false;
            let rsvrInfo = JSON.parse(data.content);
            var meetingRoomSet = [];

            rsvrInfo.map((v, i) => {
                if (meetingRoomSet.find((item, idx)=>{return item.MR_REG_NO === v.MR_REG_NO}) == undefined){
                    meetingRoomSet.push({MR_REG_NO:v.MR_REG_NO, MR_NM:v.MR_NM})
                }
            });

            let cnt = 0;
    		let idx = 0;
    		let prevIdx = 0;
    		let colorIdx = 0;
    		let equalYn = 'N';

    		for (let i = 0 ; i < rsvrInfo.length; i++) {
    			let tmp = makeTimeTable(rsvrInfo[i].RSVR_FR_HH, rsvrInfo[i].RSVR_FR_MI, rsvrInfo[i].RSVR_TO_HH, rsvrInfo[i].RSVR_TO_MI);
    			let mrRegNo = rsvrInfo[i].MR_REG_NO;

    			for (let j = 0; j < meetingRoomSet.length; j++) {
    				if (mrRegNo == meetingRoomSet[j].MR_REG_NO) {
    					idx = j;

    					if (idx != prevIdx) {
    						colorIdx = 0;
    					}
    					prevIdx = idx;

    					equalYn ='Y';
    				}
    			}

    			if (equalYn == 'N') {
    				continue;
    			}

    			let tmpArr = tmp.split(',');
    			let fillTimeTable = [];
    			for (let j = 0; j < tmpArr.length; j++) {
    				fillTimeTable[j] = tmpArr[j];
    			}

    			for (let j = 0; j < timeTable.length; j++) {
    				if (fillTimeTable[cnt] == timeTable[j]) {
    					let tmp = _paddingZero(idx);
    					if (colorIdx % 2 == 0) {
                            meetingRoomSet[prevIdx]['RSVR_T'+j] = 'A';
    					} else {
                            meetingRoomSet[prevIdx]['RSVR_T'+j] = 'B'
    					}

    					//$('#t' + tmp + timeTable[j]).attr('pk', rsvrInfo[i].MR_REQST_NO);
/*
    					var tempData = {RSVR_ID: rsvrInfo[i].RSVR_ID,
    							        DEPT_NM: rsvrInfo[i].DEPT_NM,
    							        EMP_KOR_NM: rsvrInfo[i].EMP_KOR_NM,
    							        RSVR_FR_TO_TIME: rsvrInfo[i].RSVR_FR_TO_TIME,
    							        MEET_TITLE: rsvrInfo[i].MEET_TITLE
    							        };

    					var tipContent = $.templates("#tempHint").render(tempData);

    					$('#t' + tmp + timeTable[j]).qtip( {
    						content : {
    							title:{
    								text: msgInfo2,
    							},
    							text: tipContent,
    						},
    						style : {
    							classes: 'qtip-rounded qtip-bootstrap',
    						},
    						position: {
    					        at: 'bottom middle',
    						}
    					});
*/
    					cnt++;
    				}
    			}
    			colorIdx++;
    			cnt = 0;
    			equalYn = 'N';
    		}

            sortJsonArrayByProperty(meetingRoomSet, 'MR_NM');
            return meetingRoomSet.map((v, i) => {
                let items = [<td key={'tdi'+i}>{v.MR_NM}</td>];
                for(let j = 0 ; j < 28 ; j++){
                    let bgColor = {backgroundColor:'#FFFFFF'};
                    if(v['RSVR_T'+j] == 'A'){
                        bgColor = {backgroundColor:'#b3e8ff'};
                    }else if(v['RSVR_T'+j] == 'B'){
                        bgColor = {backgroundColor:'#ffbaf2'};
                    }
                    items.push(<td style={bgColor} key={'tdj'+j}></td>);
                }
                return <tr key={'tr'+i}>{items}</tr>;
            });
        };

        if (this.props.content == '' || this.props.content==null || this.props.content==undefined){
            return false;
        }else{
            return (
                <div className="sect_schLst tbl_sch sect_tml_cell">
    				<table className="tbl_sch tml" >
    					<colgroup>
                            <col width="100" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    						<col width="35" />
    					</colgroup>
    					<thead>
    						<tr>
                                <th scope="col" className="sect_ctg_cell">회의실명</th>
    							<th scope="col" colSpan="2">07:00</th>
    							<th scope="col" colSpan="2">08:00</th>
    							<th scope="col" colSpan="2">09:00</th>
    							<th scope="col" colSpan="2">10:00</th>
    							<th scope="col" colSpan="2">11:00</th>
    							<th scope="col" colSpan="2">12:00</th>
    							<th scope="col" colSpan="2">13:00</th>
    							<th scope="col" colSpan="2">14:00</th>
    							<th scope="col" colSpan="2">15:00</th>
    							<th scope="col" colSpan="2">16:00</th>
    							<th scope="col" colSpan="2">17:00</th>
    							<th scope="col" colSpan="2">18:00</th>
    							<th scope="col" colSpan="2">19:00</th>
    							<th scope="col" colSpan="2">20:00</th>
    						</tr>
    					</thead>
    					<tbody className="tp_allbg">
                            {mapToComponents(this.props)}
    					</tbody>
    				</table>
                </div>
            );
        }
    }
}
