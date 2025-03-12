import express from 'express';

import {displayApplication, FetchByPosition} from '../controller/applicationController.js'
//Start the application route path
const applicationsRoute = express.Router();
applicationsRoute.get('/getAllApplications',displayApplication);//route to all applications
applicationsRoute.post('/findApplicationsByPosition',FetchByPosition);//route to applications by jobPosition
export default applicationsRoute;