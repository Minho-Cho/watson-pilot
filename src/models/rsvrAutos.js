var mongoose = require("mongoose");

// schema
var rsvrAutoSchema = mongoose.Schema({
    id: {type: String},
    date: {type: String},
    time: {type: String},
    reqstNo: {type: String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
},{
    toObject:{virtuals:true}
});

rsvrAutoSchema.virtual("createdDate").get(function() {
    return getDate(this.createdAt);
});

rsvrAutoSchema.virtual("createdTime").get(function() {
    return getTime(this.createdAt);
});

rsvrAutoSchema.virtual("updatedDate").get(function() {
    return getDate(this.updatedAt);
});

rsvrAutoSchema.virtual("updatedTime").get(function() {
    return getTime(this.updatedAt);
});

function getDate(dateObj){
    if(dateObj instanceof Date){
        return dateObj.getFullYear() + "-" + get2digits(dateObj.getMonth()+1)+ "-" + get2digits(dateObj.getDate());
    }
}

function getTime(dateObj){
    if(dateObj instanceof Date){
        return get2digits(dateObj.getHours()) + ":" + get2digits(dateObj.getMinutes())+ ":" + get2digits(dateObj.getSeconds());
    }
}

function get2digits(num){
    return ("0" + num).slice(-2);
}

var RsvrAuto = mongoose.model("rsvrAuto", rsvrAutoSchema);
module.exports = RsvrAuto;
