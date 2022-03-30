const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    associatedId : {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
    storeName: String,
    storeDescription: String,
    isTakeaway: Boolean,
    isDelivery: Boolean,
    subs:[
        {
            associatedId : {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
        }
    ],
    contactInfo : {
        email: String,
        mobile: String, 
        phone: String,
        city: String,
        address: String,
        latitude: String,
        longtitude: String
    },
    reviews:[
        {
            accountId: {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
            reviewContext: String,
            createdAt: {type: Date, default: Date.now },
            rank: Number,
            isPublished: Boolean,
        }
    ],
    workingHours: [
        {
            day: Number, fromHour: String, toHour: String, isOpen: Boolean
        }
    ],
    storeDescription: String,
    logo:{type: String, default:'https://cdn5.vectorstock.com/i/1000x1000/32/14/user-sign-icon-person-symbol-human-avatar-vector-12693214.jpg'},
    createdAt :{type: Date, default: Date.now},
    updateAt :{type: Date, default: Date.now},
    isLocked: {type: Boolean, default:false} //האם הוא נעול בעל האפליקציה.חסום
});

module.exports = mongoose.model('Store',storeSchema);