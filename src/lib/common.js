const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

var Settings = require("../models/settings");
var Users = require("../models/users");

module.exports = (app) => {
    dotenv.load({silent: true});

    app.get('/api/common/getSettingInfo', (request, response) => {
        Settings.find({user:process.env.LOGIN_ID}, (err, res)=>{
            response.send(res[0]);
        });
    });

    app.get('/api/common/getUserInfo', (request, response) => {
        Users.find({id:process.env.LOGIN_ID}, (err, res)=>{
            response.send(res[0]);
        });
    });

    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({ extended: true });

    app.post('/api/common/makeSettingInfo', jsonParser, (request, response) => {
        Settings.create({
            user:process.env.LOGIN_ID,
            title: '파트 회의',
            duration: '0100',
            meetingRoom: '1-2'
        }, (err, res)=>{
            response.send(res);
        });
    });
};
