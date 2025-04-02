import FormSubmission from "../models/FormSubmissionModel.js";

// SUBMIT FORM
export const submitForm = async (req, res) => {
  try {
    const { jobId, department, jobTitle } = req.body;
    const fields = [];

    for (let key in req.body) {
      if (!['jobId', 'department', 'jobTitle'].includes(key)) {
        fields.push({ label: key, value: req.body[key] });
      }
    }

    // Include uploaded files
    if (req.files && Array.isArray(req.files)) {
        req.files.forEach(file => {
          fields.push({ label: file.fieldname, value: file.filename });
        });
      }

    const submission = new FormSubmission({ jobId, department, jobTitle, fields });
    await submission.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Submission failed', error: err.message });
  }
};

// GET ALL SUBMISSIONS
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await FormSubmission.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching submissions', error: err.message });
  }
};

// GET ONE SUBMISSION BY ID
export const getSubmissionById = async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching submission', error: err.message });
  }
};

// DELETE SUBMISSION
export const deleteSubmission = async (req, res) => {
  try {
    const deleted = await FormSubmission.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.status(200).json({ message: 'Submission deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting submission', error: err.message });
  }
};
