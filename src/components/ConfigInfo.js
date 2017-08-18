import React, {Component} from 'react';

export default class ConfigInfo extends React.Component {

    render(){
        let duration = '';
        if (this.props.content.settings != undefined){
            duration = this.props.content.settings.duration;
            if(duration.substr(-2)=='00'){
                duration = Number(duration.substr(0,2))+'시간';
            }else{
                duration = Number(duration.substr(0,2))+'시간 30분';
            }
        }

        return(
            <div className="sect_schLst tbl_sch sect_tml_cell">
            { this.props.showflag && (
				<table className="tbl_sch tml" >
					<colgroup>
                        <col width="100" />
						<col width="300" />
					</colgroup>
					<thead>
						<tr>
                            <th scope="col" className="sect_ctg_cell">환경변수</th>
							<th scope="col" >기본값</th>
						</tr>
					</thead>
					<tbody className="tp_allbg">
                        <tr>
                            <td>사용자</td>
                            <td>{this.props.content.settings.user}</td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td>{this.props.content.settings.title}</td>
                        </tr>
                        <tr>
                            <td>기간</td>
                            <td>{duration}</td>
                        </tr>
                        <tr>
                            <td>회의실</td>
                            <td>{this.props.content.settings.meetingRoom}</td>
                        </tr>
					</tbody>
				</table>
            )}
            </div>
        );

    }
}
