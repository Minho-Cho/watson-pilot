import React, {Component} from 'react';

const timeTable = ['0700', '0730', '0800', '0830', '0900', '0930', '1000', '1030', '1100',
	               '1130', '1200', '1230', '1300', '1330', '1400', '1430', '1500', '1530',
	               '1600', '1630', '1700', '1730', '1800', '1830', '1900', '1930', '2000', '2030'];

export default class ConferenceRoomRsvrInfo extends React.Component {

    render(){
		let rsvrDay = '';
		if (this.props.content.length > 2){
			rsvrDay = JSON.parse(this.props.content)[0].RSVR_FR_DD;
			rsvrDay = rsvrDay.substr(0,4)+' / '+rsvrDay.substr(4,2)+' / '+rsvrDay.substr(6,2);
		}
        const mapToComponents = (data) => {
            if (data.content == '' || data.content==null || data.content==undefined) return false;
            var rsvrInfo = JSON.parse(data.content);
			rsvrInfo.sort((a,b)=>{
				return (a.MR_REG_NO.rpad(15,'0')+a.RSVR_FR_HH) < (b.MR_REG_NO.rpad(15,'0')+b.RSVR_FR_HH) ? -1 : (a.MR_REG_NO.rpad(15,'0')+a.RSVR_FR_HH) > (b.MR_REG_NO.rpad(15,'0')+b.RSVR_FR_HH) ? 1 : 0;
			});
            var meetingRoomSet = [];
			var roomInfo = JSON.parse(data.roomInfo);
            roomInfo.map((v, i) => {
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
    			let tmp = Common.makeTimeTable(rsvrInfo[i].RSVR_FR_HH, rsvrInfo[i].RSVR_FR_MI, rsvrInfo[i].RSVR_TO_HH, rsvrInfo[i].RSVR_TO_MI);
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
    					if (colorIdx % 2 == 0) {
                            meetingRoomSet[prevIdx]['RSVR_T'+j] = 'A';
    					} else {
                            meetingRoomSet[prevIdx]['RSVR_T'+j] = 'B'
    					}
    					cnt++;
    				}
    			}
    			colorIdx++;
    			cnt = 0;
    			equalYn = 'N';
    		}

            Common.sortJsonArrayByProperty(meetingRoomSet, 'MR_NM');
            return meetingRoomSet.map((v, i) => {
                let items = [<td key={'tdi'+i}>{v.MR_NM}</td>];
                for(let j = 0 ; j < 28 ; j++){
                    let bgColor = {backgroundColor:'#FFFFFF'};
                    if(v['RSVR_T'+j] == 'A'){
                        bgColor = {backgroundColor:'#ffb1aa'};
                    }else if(v['RSVR_T'+j] == 'B'){
                        bgColor = {backgroundColor:'#acc6ff'};
                    }
                    items.push(<td style={bgColor} key={'tdj'+j}></td>);
                }
                return <tr key={'tr'+i}>{items}</tr>;
            });
        };

        return (
            <div className="sect_schLst tbl_sch sect_tml_cell">
			{ this.props.showflag && (
				<div>
				<span className="dateTitle">&lt;&nbsp;{rsvrDay}&nbsp;&gt;</span>
				<table className="tbl_sch tml" >
					<colgroup>
                        <col width="200" />
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
			)}
            </div>
        );
    }
}
