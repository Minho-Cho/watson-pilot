import React from 'react';

export default class ConferenceRoomMyRsvrInfo extends React.Component {


	render(){
			const mapToComponents = (data) => {
					if (data.content == '' || data.content==null || data.content==undefined) return false;

					let MymeetingRoomSet = JSON.parse(data.content);

					let today = new Date();

					let yyyy = today.getFullYear();
					let mm = today.getMonth()+1; /*January is 0*/
					let dd = today.getDate();

					if(dd<10) dd='0'+dd
					if(mm<10) mm='0'+mm

					let Today = yyyy + mm + dd;

					return MymeetingRoomSet.map((v, i) => {

							return <tr key={i}>
										 		<td>{v.MR_REQST_NO}</td>
												<td>{v.RSVR_FR_DD}</td>
												<td>{v.MR_REG_NO}</td>
												<td>{v.MR_NM}</td>
												<td>{v.RSVR_FR_HH}</td>
												<td>{v.RSVR_TO_HH}</td>
												<td>{v.MEET_TITLE}</td>
											</tr>;
							});
			};

			return (
					<div className="sect_schLst tbl_sch sect_tml_cell">
						{this.props.showflag && (
							<table className="tbl_sch tml">
							<colgroup>
								<col width="160" />
								<col width="100" />
								<col width="100" />
								<col width="150" />
								<col width="70" />
								<col width="70" />
								<col width="250" />
							</colgroup>
							<thead>
								<tr>
									<th scope="col" className="sect_rsvr_no_colhead">예약번호</th>
									<th scope="col" className="sect_rsvr_dt_colhead">예약날짜</th>
									<th scope="col" className="sect_mr_id_colhead">회의실ID</th>
									<th scope="col" className="sect_mr_nm_colhead">회의실명</th>
									<th scope="col" className="sect_start_tm_colhead">시작시간</th>
									<th scope="col" className="sect_end_tm_colhead">마침시간</th>
									<th scope="col" className="sect_me_title_colhead">회의내용</th>
								</tr>
							</thead>
							<tbody className="my_rsvr_list_data">
								{mapToComponents(this.props)}
							</tbody>
						</table>
					)}
					</div>
					);
			}
	}
