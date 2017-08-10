import React, {Component} from 'react';

export default class ConferenceRoom extends React.Component {

    render(){
        const mapToComponents = (data) => {
            if (data.content == '' || data.content==null || data.content==undefined) return false;
            let meetingRoomSet = JSON.parse(data.content);

            Common.sortJsonArrayByProperty(meetingRoomSet, 'MR_NM');
            return meetingRoomSet.map((v, i) => {
                return (
                    <tr key={i}>
                        <td>{v.MR_NM}</td>
                        <td>{v.RSVR_TYPE=='F'?'우선예약':v.RSVR_TYPE=='A'?'결재승인':v.RSVR_TYPE=='Q'?'담당자예약':''}</td>
                        <td>좌석수 : {v.CHAIR_DESC}, 빔프로젝트 : {v.BEAN_DESC=='0'?'없음':v.BEAN_DESC+'대'}, 기타 : {v.ETC_DESC}</td>
                    </tr>
                );
            });
        };

        return(
            <div className="sect_schLst tbl_sch sect_tml_cell">
            { this.props.showflag && (
				<table className="tbl_sch tml" >
					<colgroup>
                        <col width="100" />
						<col width="100" />
						<col width="500" />
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
            )}
            </div>
        );

    }
}
