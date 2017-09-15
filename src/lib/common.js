const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const cron = require('./cron');

var Settings = require("../models/settings");
var Users = require("../models/users");
var RsvrAutos = require("../models/rsvrAutos");

const _paddingZero = function(num){
    if (parseInt(num) < 10){
        return '0' + parseInt(num);
    }else{
        return '' + parseInt(num);
    }
}

module.exports = (app) => {
    dotenv.load({silent: true});

    app.get('/api/common/getSettingInfo', (request, response) => {
        Settings.find({user:process.env.LOGIN_ID}, (err, res)=>{
            response.send(res[0]);
        });
    });

    app.get('/api/common/initCron', (request, response) => {
        RsvrAutos.find({}, (err, res)=>{
            //저장해놓은 자동시작 요청들 재시작
            var date = _paddingZero(new Date().getFullYear()) + _paddingZero(new Date().getMonth()+1) + _paddingZero(new Date().getDate());
            var time = _paddingZero(new Date().getHours()) + _paddingZero(new Date().getMinutes());

            res.forEach((v,i)=>{
                //시간지난 요청은 삭제
                if(v.date < date || (v.date == date && v.time <= time)){
                    RsvrAutos.findByIdAndRemove(v._id, function(err){});
                }else{
                    var json = {MR_REQST_NO: v.reqstNo,
                                BTN_STS_CD: 'Y',
                                TB_PWD: 'CRRS'
                    }

                    var Service = require('../egss_resv_cr');
                    var egssRequest = new Service.COEaiMngShared.updateConferenceRoomStatus();

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

                    var task = new cron(v.date, v.time, func);

                }
                //신청취소건 삭제로직 추가해야함.
            });

            response.send(res[0]);
        });
    });

    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({ extended: true });

    app.post('/api/common/getUserInfo', jsonParser, (request, response) => {
        Users.find({id:request.body.inputText}, (err, res)=>{
            response.send(res[0]);
        });
    });

    app.post('/api/common/makeSettingInfo', jsonParser, (request, response) => {
        Settings.create({
            user: process.env.LOGIN_ID,
            title: process.env.TITLE,
            duration: process.env.DURATION,
            meetingRoom: process.env.MEETINGROOM
        }, (err, res)=>{
            response.send(res);
        });
    });

    app.post('/api/common/updateSettingTitleInfo', jsonParser, (request, response) => {
        Settings.find({
            user:process.env.LOGIN_ID
        }, (err, res)=>{
            Settings.findByIdAndUpdate(res[0]._id,{
                title: request.body.meetingTitle
            }, (err2, res2)=>{
                res2.title = request.body.meetingTitle;
                response.send(res2);
            });
        });
    });

    app.post('/api/common/updateSettingTimeInfo', jsonParser, (request, response) => {
        Settings.find({
            user:process.env.LOGIN_ID
        }, (err, res)=>{
            Settings.findByIdAndUpdate(res[0]._id,{
                duration: request.body.meetingTime
            }, (err2, res2)=>{
                res2.duration = request.body.meetingTime;
                response.send(res2);
            });
        });
    });
};
