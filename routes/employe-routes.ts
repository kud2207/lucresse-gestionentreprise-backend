import express from 'express';
import { getAllEmployees, createEmployee, getOneEmployee, updateEmployee, deleteEmployee } from '../models/employe-model';

const employeRoute = express.Router();

//(API): http://localhost:4000/salle
employeRoute.get("/findAll", getAllEmployees);
employeRoute.get("/findOne/:id", getOneEmployee);
employeRoute.post("/create", createEmployee);
employeRoute.put("/update/:id", updateEmployee);
employeRoute.delete("/delete/:id", deleteEmployee);


export {
    employeRoute
}