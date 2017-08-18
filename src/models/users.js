var mongoose = require("mongoose");

// schema
var userSchema = mongoose.Schema({
    id: {type: String},
    name: {type: String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
},{
    toObject:{virtuals:true}
});

userSchema.virtual("createdDate").get(function() {
    return getDate(this.createdAt);
});

userSchema.virtual("createdTime").get(function() {
    return getTime(this.createdAt);
});

userSchema.virtual("updatedDate").get(function() {
    return getDate(this.updatedAt);
});

userSchema.virtual("updatedTime").get(function() {
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

var User = mongoose.model("user", userSchema);
module.exports = User;
