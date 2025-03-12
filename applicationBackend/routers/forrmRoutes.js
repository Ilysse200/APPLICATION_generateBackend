import express from 'express';
import {createForm, displayFoms,getFormsById,deleteFormById,  updateFormById} from '../controller/formController.js'
//A map to get all product-related routes
const formRouter = express.Router();
formRouter.post('/createForm', createForm); //road to create form
formRouter.get('/getAllforms', displayFoms); //road to get all forms
formRouter.get('/getformsById/:id', getFormsById);//road to get a specific form
formRouter.delete('/deleteForm/:id',deleteFormById); //road to delete a specific form
formRouter.put('/updateForm/:id', updateFormById);// road to update form
export default formRouter;