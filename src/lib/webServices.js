const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();

module.exports = function(app){
    app.get('/api/webservice/getConferenceRoomInfo', (request, response) => {
        var Service = require('../egss_resv_cr');
        var egssRequest = new Service.COEaiMngShared.getConferenceRoomInfo();

        var json = {MR_GBN:'M', COMP_ID:'YP', BLDNG_ID:'ICTSC', FLOR_LOC:'6'};
        egssRequest.getConferenceRoomInfoParameter = new Service.Types.getConferenceRoomInfoParameter(json);

        egssRequest.request((err, res) => {
            if (!(err === null || err == 'null')){
                console.log('ERR : ',err);
            }else{
                var result = res.extract().getConferenceRoomInfoReturn;
                if (result.E_RETVAL != 'S'){
                    console.log('ERR : ',result.E_RETMSG);
                }else{
                    var roomInfo = result.ROOM_INFO;
                    console.log(roomInfo);
                    response.send(roomInfo);
                }
            }
        });
    });
}
