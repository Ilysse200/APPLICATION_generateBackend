import express from 'express';
import {
  createFormBlueprint,
  getFormBlueprintByJob,
  updateFormBlueprint,
  deleteFormBlueprint,
  displayFormsBuilder
} from '../controller/formBuilderController.js';

const formBuilderRouter = express.Router();

formBuilderRouter.post('/createBluePrint', createFormBlueprint);
formBuilderRouter.get('/formBlueprints/:jobId', getFormBlueprintByJob);
formBuilderRouter.put('/modifyBlueprint/:jobId', updateFormBlueprint);
formBuilderRouter.delete('/deleteBlueprint/:jobId', deleteFormBlueprint);
formBuilderRouter.get('/displayForms', displayFormsBuilder)

export default formBuilderRouter;