const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const bodyParser = require('body-parser')
require('date-utils');

module.exports = function(app){
    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({ extended: true });

    var json = {MR_GBN:'M', COMP_ID:'YP', BLDNG_ID:'ICTSC', FLOR_LOC:'6'};

    app.get('/api/webservice/getConferenceRoomInfo', (request, response) => {
        var Service = require('../egss_resv_cr');
        var egssRequest = new Service.COEaiMngShared.getConferenceRoomInfo();

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

    app.post('/api/webservice/getConferenceRoomRsvrInfo', jsonParser, (request, response) => {
        var dt = new Date();
        var rsvrDay = dt.toFormat('YYYYMMDD');
        request.body.entities.forEach((v,i)=>{
            if (v.entity == 'sys-date'){
                rsvrDay = v.value.replace(/-/gi,'');
            }
        })

        var Service = require('../egss_resv_cr');
        var egssRequest = new Service.COEaiMngShared.getConferenceRoomRsvrInfo();

        var json = {MR_GBN:'M', COMP_ID:'YP', BLDNG_ID:'ICTSC', FLOR_LOC:'6', RSVR_FR_DD:rsvrDay};
        egssRequest.getConferenceRoomRsvrInfoParameter = new Service.Types.getConferenceRoomRsvrInfoParameter(json);

        egssRequest.request((err, res) => {
            if (!(err === null || err == 'null')){
                console.log('ERR : ',err);
            }else{
                var result = res.extract().getConferenceRoomRsvrInfoReturn;
                if (result.E_RETVAL != 'S'){
                    console.log('ERR : ',result.E_RETMSG);
                }else{
                    var rsvrInfo = result.RSVR_INFO;
                    console.log(rsvrInfo);
                    response.send(rsvrInfo);
                }
            }
        });
    });
}
