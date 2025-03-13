import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
// const express = require('express');
import bodyParser from 'body-parser';
import formRouter from './routers/forrmRoutes.js';
import applicationsRoute from './routers/applicationsRoute.js'
import userRouter from './routers/userRoutes.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());

//Create a path to reach the form road

app.use('/forms', formRouter)
app.use('/applications',applicationsRoute)
app.use('/users', userRouter)

//variables that hold vvalues inside the .env file
const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const port = process.env.PORT || 3000;
const db_pass = process.env.DB_PASS;


//copied codes
const dbUri = `mongodb+srv://${db_user}:${db_pass}@cluster0.xstok.mongodb.net/${db_name}`;
mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
     
    });
  })
  .catch((error) => {
    console.log(error);
  });
