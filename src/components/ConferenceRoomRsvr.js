import React, {Component} from 'react';

export default class ConferenceRoomRsvr extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			roomName : '',
			roomTitle : '',
			roomCode : '',
			rsvrDay : '',
			TFH : '',
			TFM : '',
			TTH : '',
			TTM : ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		var nextState = {};
		nextState[e.target.name] = e.target.value;
		// this.setState(nextState,this.handleProcess);
	}

	handleProcess(){
		this.props.onInsert(this.state);
	}

    render(){
		// this.handleProcess();
		let rsvrDay = this.props.content.rsvrDay;
		if (rsvrDay != undefined){
			rsvrDay = rsvrDay.substr(0,4)+' / '+rsvrDay.substr(4,2)+' / '+rsvrDay.substr(6,2);
		}

        return(
            <div className="sect_schLst tbl_sch sect_tml_cell">
			{ this.props.showflag && (
				<table className="tbl_sch tml" >
					<colgroup>
                        <col width="100" />
						<col width="400" />
					</colgroup>
					<thead>
						<tr>
                            <th scope="col" className="sect_ctg_cell">구분</th>
							<th scope="col" >정보</th>
						</tr>
					</thead>
					<tbody className="tp_allbg">
						<tr>
							<td>회의일자</td>
							<td><input className='text' type='text' style={{width:'400px',border:'0',textAlign:'center'}} name='roomName' onChange={this.handleChange} value={rsvrDay}/></td>
						</tr>
						<tr>
							<td>회의시간</td>
							<td>
								<input className='text' type='text' style={{width:'20px',border:'0'}} name='TFH' onChange={this.handleChange} value={this.props.content.TFH}/>시&nbsp;&nbsp;
								<input className='text' type='text' style={{width:'20px',border:'0'}} name='TFM' onChange={this.handleChange} value={this.props.content.TFM}/>분&nbsp;&nbsp; ~&nbsp;&nbsp;
								<input className='text' type='text' style={{width:'20px',border:'0'}} name='TTH' onChange={this.handleChange} value={this.props.content.TTH}/>시&nbsp;&nbsp;
								<input className='text' type='text' style={{width:'20px',border:'0'}} name='TTM' onChange={this.handleChange} value={this.props.content.TTM}/>분
							</td>
						</tr>
                        <tr>
							<td>회의장소</td>
							<td><input className='text' type='text' style={{width:'400px',border:'0',textAlign:'center'}} name='roomName' onChange={this.handleChange} value={this.props.content.roomName}/></td>
						</tr>
						<tr>
							<td>회의제목</td>
							<td><input className='text' type='text' style={{width:'400px',border:'0',textAlign:'center'}} name='roomTitle' onChange={this.handleChange} value={this.props.content.roomTitle}/></td>
						</tr>
					</tbody>
				</table>
			)}
            </div>
        );

    }
}
