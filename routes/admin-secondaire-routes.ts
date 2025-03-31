import express from 'express';
import { getAllAdminSecondaire, createAdminSecondaire, getOneAdminSecondaire, updateAdminSecondaire , deleteAdminSecondaire } from '../models/admin-secondaire-model';

const adminSecondaireRoute = express.Router();

//(API): http://localhost:4000/salle
adminSecondaireRoute.get("/findAll", getAllAdminSecondaire);
adminSecondaireRoute.get("/findOne/:id", getOneAdminSecondaire);
adminSecondaireRoute.post("/create", createAdminSecondaire);
adminSecondaireRoute.put("/update/:id", updateAdminSecondaire);
adminSecondaireRoute.delete("/delete/:id", deleteAdminSecondaire);


export {
    adminSecondaireRoute
}