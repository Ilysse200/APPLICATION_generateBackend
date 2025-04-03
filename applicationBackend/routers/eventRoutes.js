import express from 'express';
import {
    createEvent,
    displayEvents,
    getEventsById,
    updateEventById,
    deleteEvent
} 
from '../controller/eventController.js';

const eventRouter = express.Router();

eventRouter.post('/eventCreate', createEvent);
eventRouter.get('/fetchEvent', displayEvents);
eventRouter.put('/updateEvent/:id',updateEventById);
eventRouter.delete('/deleteEvent/:id',deleteEvent);
eventRouter.get('/conditionalDisplay/:id',getEventsById)

export default eventRouter;