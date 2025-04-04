import mongoose from "mongoose";
const {Schema, model} = mongoose;

const trainingSchema = new Schema({

    trainingName:{
        type: String,
        required: true
    },
    trainingObjective:{
        type: String,
        required: true
    },
    trainingDuration:{
        type: String,
        required: true
    },
    trainingMode:{
        type:String,
        enum:["Online", "Onsite", "Hybrid"],
        required: true
    },
    trainingRequirements:{
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
    },

})
const trainings = model('trainings', trainingSchema);
export default trainings;