import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userRole:{
        type: String,
        enum: ["Admin", "User"],
        required: true
    }
})

const user = model('user',userSchema);