import express from 'express';
import { getAllEquipements, createEquipement, deleteEquipement, getOneEquipement, updateEquipement } from '../models/equipement-model';

const equipementRoute = express.Router();

//(API): http://localhost:4000/salle
equipementRoute.get("/findAll", getAllEquipements);
equipementRoute.get("/findOne/:id", getOneEquipement);
equipementRoute.post("/create", createEquipement);
equipementRoute.put("/update/:id", updateEquipement);
equipementRoute.delete("/delete/:id", deleteEquipement);


export {
    equipementRoute
}