import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const fieldSchema = new Schema({
  label: { type: String, required: true },
  type: { type: String, enum: ['text', 'textarea', 'dropdown', 'file'], required: true },
  options: [String], // For dropdown fields only
  required: { type: Boolean, default: false }
});

const formBlueprintSchema = new Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosition', required: true },
  fields: [fieldSchema]
}, { timestamps: true });

const FormBlueprint = model('FormBlueprint', formBlueprintSchema);
export default FormBlueprint;