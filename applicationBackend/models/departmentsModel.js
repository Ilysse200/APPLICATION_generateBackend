import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  head: {
    type: String,
    required: true
  },
  employees: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Department = model('Department', departmentSchema);
export default Department;
