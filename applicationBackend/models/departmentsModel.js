import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  vacancyType:{
    type: String,
    enum:["Jobs","Trainings","Events"],
    required: true
  },
  purpose:{
    type:String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Department = model('Department', departmentSchema);
export default Department;
