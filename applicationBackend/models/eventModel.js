import mongoose from "mongoose";
const {Schema, model} = mongoose;

//Created event table
const eventSchema = new Schema({
    
    eventName:{
        type: String,
        required: true
    },
    eventDate:{
        type: Date,
        default:Date.now //Saves the current date automatically
    },
    eventLocation:{
        type: String,
        required: true
    },
    eventDescription:{
        type: String,
        required: true
    },
    eventRequirements:{
        type: String,
        required: true
    }
})

const events = model('events',eventSchema);
export default events;