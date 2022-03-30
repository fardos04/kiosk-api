const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String, 
    createdAt :{type: Date, default: Date.now},
    password: String, 
    mobile: String,
    avatar:{type: String, default:'https://cdn5.vectorstock.com/i/1000x1000/32/14/user-sign-icon-person-symbol-human-avatar-vector-12693214.jpg'},
    firstName: String,
    lastName: String,
    passcode:Number,
    subs:[
        {
            storedId : {type: mongoose.Schema.Types.ObjectId , ref: 'Store'},
        }
    ],
    level: {type: String, default:'Newbie'},
    points: {type: Number, default:0},
    isBusiness: {type: Boolean, default:false}, 
    isApproved: {type: Boolean, default:false},//קוד אימות
    isLocked: {type: Boolean, default:false} //האם הוא נעול בעל האפליקציה.חסום
});

module.exports = mongoose.model('User',userSchema);