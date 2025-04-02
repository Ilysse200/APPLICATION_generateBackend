import express from 'express';
import {submitForm, getAllSubmissions, getSubmissionById, deleteSubmission } from '../controller/FormSubmissionController.js';
import upload from '../middleware/multer.js'; // if using multer

const submissionRouter = express.Router();

// Handle form submission (with file upload)
submissionRouter.post('/formCreate', upload.any(), submitForm);

// View all form submissions
submissionRouter.get('/formFetch', getAllSubmissions);

// Get one submission by ID
submissionRouter.get('/formFetchById/:id', getSubmissionById);

// Delete a submission
submissionRouter.delete('/formDelete/:id', deleteSubmission);

export default submissionRouter;
