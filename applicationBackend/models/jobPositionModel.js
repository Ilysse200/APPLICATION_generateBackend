// models/JobPosition.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const jobPositionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: false,
  },
  minSalary: {
    type: Number,
    required: false,
    min: 0,
  },
  maxSalary: {
    type: Number,
    required: false,
    validate: {
      validator: function (value) {
        return value >= this.minSalary;
      },
      message: 'Maximum salary must be greater than or equal to minimum salary.',
    },
  },
  deadline: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const JobPosition = model('JobPosition', jobPositionSchema);
export default JobPosition;
