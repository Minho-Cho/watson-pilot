const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const watson = require('watson-developer-cloud');

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

const message = function(text, context) {
    const conversation = new ConversationV1({username: process.env.CONVERSATION_USERNAME,
                                             password: process.env.CONVERSATION_PASSWORD,
                                             version_date: '2017-04-21'});

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

        message(request.body.message, request.body.context).then((res)=>{
            
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n', JSON.stringify(res, null, 2), '\n----------------------------------------------------------');

            response.send(res)
        });
    });
};
