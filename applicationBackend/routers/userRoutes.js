import express from 'express';

import { Login, Register } from '../controller/userController.js';

//Start the user route path
const userRouter = express.Router();

userRouter.post('/register', Register);
userRouter.post('/login', Login);

export default userRouter;