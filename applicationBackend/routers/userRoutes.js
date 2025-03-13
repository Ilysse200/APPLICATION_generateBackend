import express from 'express';

import { Register } from '../controller/userController.js';

//Start the user route path
const userRouter = express.Router();

userRouter.post('/register', Register);

export default userRouter;