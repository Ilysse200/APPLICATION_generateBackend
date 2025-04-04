// models/formBlueprintModel.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const fieldSchema = new Schema({
  label: { type: String, required: true },
  type: { type: String, enum: ['text', 'textarea', 'dropdown', 'file'], required: true },
  options: [String], // For dropdowns
  required: { type: Boolean, default: false },
});

const formBlueprintSchema = new Schema({
  vacancyType: {
    type: String,
    enum: ['Jobs', 'Trainings', 'Events'],
    required: true,
    unique: true, // One form per vacancyType
  },
  fields: [fieldSchema],
}, { timestamps: true });

const FormBlueprint = model('FormBlueprint', formBlueprintSchema);
export default FormBlueprint;
