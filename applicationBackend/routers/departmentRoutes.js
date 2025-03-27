import express from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} 
from '../controller/departmentController.js';

const deptRouter = express.Router();

deptRouter.post('/createDept', createDepartment);
deptRouter.get('/fetchDept', getAllDepartments);
deptRouter.get('/displayDept/:id', getDepartmentById);
deptRouter.put('/modifyDept/:id', updateDepartment);
deptRouter.delete('/deleteDept/:id', deleteDepartment);

export default deptRouter;
