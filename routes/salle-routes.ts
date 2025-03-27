import express from 'express';
import { getAllSalle, getOneSalle, createSalle, updateOneSalle, deleteOneSalle } from '../models/salle-model';

const salleRouter = express.Router();

//(API): http://localhost:4000/salle
salleRouter.get("/findAll", getAllSalle);
salleRouter.get("/findOne/:nomSalle", getOneSalle);
salleRouter.post("/create", createSalle);
salleRouter.put("/update/:nomSalle", updateOneSalle);
salleRouter.delete("/delete/:id", deleteOneSalle);


export {
    salleRouter
}