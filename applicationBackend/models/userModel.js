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
    gender:{
        type:String,
        enum:['Male', 'Female','Other'],
        required:true
    },
    date:{
        type:Date,
        required:true,
    },
    userRole:{
        type: String,
        enum: ["Admin", "User"],
        required: true
    },
    tokens: { 
        accessToken: { type: String }
    }
})

const User2 = model('User2',userSchema);
export default User2;