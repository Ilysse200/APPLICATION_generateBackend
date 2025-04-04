// routes/formBuilderRoutes.js
import express from 'express';
import {
  createOrUpdateBlueprint,
  getBlueprintByVacancy,
  deleteBlueprint,
  getBlueprintByVacancyAndId,
  getAllBlueprints
} from '../controller/formBuilderController.js';
import upload from '../middleware/multer.js';

const formBuilderRouter = express.Router();

formBuilderRouter.post('/blueprint',upload.any(), createOrUpdateBlueprint);
formBuilderRouter.get('/blueprint/:vacancyType', getBlueprintByVacancy);
formBuilderRouter.delete('/blueprint/:vacancyType', deleteBlueprint);
formBuilderRouter.get('/blueprint/:vacancyType/:vacancyId', getBlueprintByVacancyAndId);
formBuilderRouter.get('/allblueprints', getAllBlueprints);


export default formBuilderRouter;
