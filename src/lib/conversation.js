const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const watson = require('watson-developer-cloud');

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var Convs = require("../models/conversations");

const message = function(text, context) {
    //timezone이 없을경우 DMT로 설정됨
    context.timezone = "Asia/Seoul";
    const conversation = new ConversationV1({username: process.env.CONVERSATION_USERNAME,
                                             password: process.env.CONVERSATION_PASSWORD,
                                             version_date: '2017-05-26'});

    const payload = {
        workspace_id: process.env.WORKSPACE_ID,
        input: {
            text: text
        },
        context: context
    };

    return new Promise((resolve, reject) => conversation.message(payload, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    }));
}

module.exports = (app) => {
    dotenv.load({silent: true});

    var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({ extended: true });

    app.post('/api/conversation', jsonParser, (request, response) => {
        //this is the point you prepare for CORS
        //var origin = request.headers.origin;
        //response.header("Access-Control-Allow-Origin", origin);
        //and you have just solved the CORS issue

        message(request.body.message, request.body.context).then((res) => {

            //console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ request\n', JSON.stringify(request.body, null, 2), '\n----------------------------------------------------------');
            //console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ response\n', JSON.stringify(res, null, 2), '\n----------------------------------------------------------');

            //대화내용 DB에 저장
            if (request.body.context.userId != '' && request.body.context.userId != undefined){
                Convs.create({
                    userId: request.body.context.userId,
                    inputText: request.body.message
                }, (err, res)=>{
                    if(err){
                        console.log('ERROR occurs while inserting convs to DB')
                    }
                });
            }

            response.send(res)
        });
    });
};
