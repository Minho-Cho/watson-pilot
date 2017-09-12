var mongoose = require("mongoose");

// schema
var convSchema = mongoose.Schema({
    userId: {type: String},
    inputText: {type: String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
},{
    toObject:{virtuals:true}
});

convSchema.virtual("createdDate").get(function() {
    return getDate(this.createdAt);
});

convSchema.virtual("createdTime").get(function() {
    return getTime(this.createdAt);
});

convSchema.virtual("updatedDate").get(function() {
    return getDate(this.updatedAt);
});

convSchema.virtual("updatedTime").get(function() {
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

var Conv = mongoose.model("conv", convSchema);
module.exports = Conv;
