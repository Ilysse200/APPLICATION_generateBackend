import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from '../controller/jobsController.js';

const jobRouter = express.Router();

// POST: Create a new job
jobRouter.post('/jobCreation', createJob);

// GET: Get all jobs
jobRouter.get('/displayJobs', getAllJobs);

// GET: Get a job by ID
jobRouter.get('/:id', getJobById);

// PUT: Update a job by ID
jobRouter.put('/updateJobs/:id', updateJob);

// DELETE: Delete a job by ID
jobRouter.delete('/deleteJobPosition/:id', deleteJob);

export default jobRouter;
