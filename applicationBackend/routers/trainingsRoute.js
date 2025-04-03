// routes/trainingsRoutes.js
import express from 'express';
import {
  createTraining,
  getAllTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining
} from '../controller/trainingsController.js';

const trainingRouter = express.Router();

trainingRouter.post('/createTrainings', createTraining);
trainingRouter.get('/allTrainings', getAllTrainings);
trainingRouter.get('/Trainings/:id', getTrainingById);
trainingRouter.put('/updateTrainings/:id', updateTraining);
trainingRouter.delete('/deleteTrainings/:id', deleteTraining);

export default trainingRouter;
