import React from 'react';

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

export default class ConferenceRoom extends React.Component {

    render(){
        const mapToComponents = (data) => {
            if (data.content == '' || data.content==null || data.content==undefined) return false;
            let meetingRoomSet = JSON.parse(data.content);
            /*
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
                            meetingRoomSet[prevIdx]['RSVR_T'+j] = '1';
    						//$('#t' + tmp + timeTable[j]).css('background-color', '#00a0ae');
    					} else {
                            meetingRoomSet[prevIdx]['RSVR_T'+j] = '2'
    						//$('#t' + tmp + timeTable[j]).css('background-color', '#ccffff');
    					}

    					cnt++;
    				}
    			}
    			colorIdx++;
    			cnt = 0;
    			equalYn = 'N';
    		}
*/
            sortJsonArrayByProperty(meetingRoomSet, 'MR_NM');
            return meetingRoomSet.map((v, i) => {
                return <tr key={i}><td>{v.MR_NM}</td><td>{v.RSVR_TYPE}</td><td></td></tr>;
            });
        };

        if (this.props.content == '' || this.props.content == undefined){
            return false;
        }else{
            return(
                <div className="sect_schLst tbl_sch sect_tml_cell">
    				<table className="tbl_sch tml" >
    					<colgroup>
                            <col width="100" />
    						<col width="100" />
    						<col width="100" />
    					</colgroup>
    					<thead>
    						<tr>
                                <th scope="col" className="sect_ctg_cell">회의실명</th>
    							<th scope="col" >예약타입</th>
    							<th scope="col" >기타정보</th>
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
