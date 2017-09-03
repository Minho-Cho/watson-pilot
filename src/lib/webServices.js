const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const bodyParser = require('body-parser')
const cron = require('./cron');

require('date-utils');

module.exports = function(app){
    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({ extended: true });

    var json = {MR_GBN:'M', COMP_ID:'YP', BLDNG_ID:'ICTSC', FLOR_LOC:'6'};

    app.get('/api/webservice/getConferenceRoomInfo', (request, response) => {
        var Service = require('../egss_resv_cr');
        var egssRequest = new Service.COEaiMngShared.getConferenceRoomInfoDetail();

        egssRequest.getConferenceRoomInfoDetailParameter = new Service.Types.getConferenceRoomInfoDetailParameter(json);

        egssRequest.request((err, res) => {
            if (!(err === null || err == 'null')){
                console.log('ERR : ',err);
            }else{
                var result = res.extract().getConferenceRoomInfoDetailReturn;
                if (result.E_RETVAL != 'S'){
                    console.log('ERR : ',result.E_RETMSG);
                }else{
                    var roomInfo = result.ROOM_INFO;
                    console.log(roomInfo);
                }
                response.send(roomInfo);
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
                var rsvrInfo = result.RSVR_INFO;
                if (result.E_RETVAL != 'S'){
                    console.log('ERR : ',result.E_RETMSG);
                }else{
                    console.log(rsvrInfo);
                }
                response.send(rsvrInfo);
            }
        });
    });

    app.post('/api/webservice/getConferenceRoomMyRsvrInfo', jsonParser, (request, response) => {
        var dt = new Date();
        var rsvrDay = dt.toFormat('YYYYMMDD');
        request.body.entities.forEach((v,i)=>{
            if (v.entity == 'sys-date'){
                rsvrDay = v.value.replace(/-/gi,'');
            }
        })

        var Service = require('../egss_resv_cr');
        var egssRequest = new Service.COEaiMngShared.getConferenceRoomMyRsvrInfo();

        var json = {EMP_ID: process.env.LOGIN_ID, MR_GBN:'M', COMP_ID:'YP', BLDNG_ID:'ICTSC', FLOR_LOC:'6', BTN_STS_CD: 'R'};
        egssRequest.getConferenceRoomMyRsvrInfoParameter = new Service.Types.getConferenceRoomMyRsvrInfoParameter(json);
        console.log('parameter_json :: ', JSON.stringify(json));

        egssRequest.request((err, res) => {
            if (!(err === null || err == 'null')){
                console.log('ERR : ',err);
            }else{
                var result = res.extract().getConferenceRoomMyRsvrInfoReturn;
                var rsvrInfo = result.RSVR_INFO;
                if (result.E_RETVAL != 'S'){
                    console.log('ERR : ',result.E_RETMSG);
                }else{
                    console.log(rsvrInfo);
                }
                response.send(rsvrInfo);
            }
        });
    });

    app.post('/api/webservice/addConferenceRoomRsvr', jsonParser, (request, response) => {
        var rsvrInfo = request.body.rsvrData;
        var entities = request.body.entities;
        var Service = require('../egss_resv_cr');
        var egssRequest = new Service.COEaiMngShared.addConferenceRoomRsvr();

        var json = {MR_REG_NO: rsvrInfo.roomCode,
                    RSVR_DE: rsvrInfo.rsvrDay,
                    RSVR_FROM_HH: rsvrInfo.TFH,
                    RSVR_FROM_MI: rsvrInfo.TFM,
                    RSVR_TO_HH: rsvrInfo.TTH,
                    RSVR_TO_MI: rsvrInfo.TTM,
                    MEET_TITLE: rsvrInfo.roomTitle,
                    PROC_STS_CD: '',
                    BTN_STS_CD: '',
                    EMP_ID: process.env.LOGIN_ID,
                    TB_PWD: 'CRRS'
        }
        egssRequest.addConferenceRoomRsvrParameter = new Service.Types.addConferenceRoomRsvrParameter(json);

        egssRequest.request((err, res) => {
            if (!(err === null || err == 'null')){
                console.log('ERR : ',err);
                //에러처리 추가
            }else{
                var result = res.extract().addConferenceRoomRsvrReturn;
                if (result.E_RETVAL != 'S'){
                    console.log('ERR : ',result.E_RETMSG);
                }else{
                    var rsvrInfo = result.RSVR_INFO;
                    console.log(rsvrInfo);
                }
                response.send(rsvrInfo);
            }
        });
    });

    app.post('/api/webservice/checkAutoStart', jsonParser, (request, response) => {
        var timeDateInfo = request.body.timeDateInfo;
        var Service = require('../egss_resv_cr');
        var egssRequest = new Service.COEaiMngShared.getConferenceRoomMyRsvrInfo();

        var json = {EMP_ID: process.env.LOGIN_ID,
                    SEARCH_KEYWORD: '',
                    MR_GBN: 'M',
                    FLOR_LOC: '6',
                    BLDNG_ID: 'ICTSC',
                    COMP_ID: 'YP',
                    MR_REG_NO: '',
                    BTN_STS_CD: 'R'
        }
        egssRequest.getConferenceRoomMyRsvrInfoParameter = new Service.Types.getConferenceRoomMyRsvrInfoParameter(json);

        egssRequest.request((err, res) => {
            if (!(err === null || err == 'null')){
                console.log('ERR : ',err);
                //에러처리 추가
            }else{
                var result = res.extract().getConferenceRoomMyRsvrInfoReturn;
                var reqstNo = '';
                if (result.E_RETVAL != 'S'){
                    console.log('ERR : ',result.E_RETMSG);
                }else{
                    var myRsvrInfo = result.RSVR_INFO;
                    myRsvrInfo.forEach((v,i) => {
                        // console.log(v.RSVR_FR_DD,'***',timeDateInfo.rsvrDay,'***',v.RSVR_FR_HH,'***',timeDateInfo.TFH,'***',v.RSVR_FR_MI,'***',timeDateInfo.TFM)
                        if (v.RSVR_FR_DD == timeDateInfo.rsvrDay && v.RSVR_FR_HH == timeDateInfo.TFH && v.RSVR_FR_MI == timeDateInfo.TFM){
                            reqstNo = v.MR_REQST_NO;
                        }
                    });
                }
                response.send(reqstNo);
            }
        });
    });

    app.post('/api/webservice/autoStart', jsonParser, (request, response) => {
        var reqstNo = request.body.context.reqstInfo.reqstNo;
        var startDate = request.body.context.reqstInfo.startDate;
        var startTime = request.body.context.reqstInfo.startTime;
        var Service = require('../egss_resv_cr');
        var egssRequest = new Service.COEaiMngShared.updateConferenceRoomStatus();

        var json = {MR_REQST_NO: reqstNo,
                    BTN_STS_CD: 'Y',
                    TB_PWD: 'CRRS'
        }

        var func = function(){
            egssRequest.updateConferenceRoomStatusParameter = new Service.Types.updateConferenceRoomStatusParameter(json);

            egssRequest.request((err, res) => {
                if (!(err === null || err == 'null')){
                    console.log('ERR : ',err);
                    //에러처리 추가
                }else{
                    var result = res.extract().updateConferenceRoomStatusReturn;
                    if (result.E_RETVAL != 'S'){
                        console.log('ERR : ',result.E_RETMSG);
                    }
                }
            });
        };

        var task = new cron(startDate, startTime, func);
        response.send(task);
    });
}
