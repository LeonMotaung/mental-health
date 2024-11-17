const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true, min: 0 }, 
    address: { type: String },
    postcode: { type: String, required: true },
    phone: { 
        type: String, 
        required: true,
        match: [/^\d+$/, 'Phone number must contain only digits'] 
    },
    nickname: { type: String, required: true },
    hometown: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'users'); 

module.exports = User;
