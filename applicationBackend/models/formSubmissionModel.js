import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const fieldSchema = new Schema({
  label: { type: String, required: true },
  value: Schema.Types.Mixed
});

const formSubmissionSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'JobPosition', required: true },
  department: { type: String, required: true },
  jobTitle: { type: String, required: true },
  fields: [fieldSchema]
}, { timestamps: true });

const FormSubmission = model('FormSubmission', formSubmissionSchema);
export default FormSubmission;
