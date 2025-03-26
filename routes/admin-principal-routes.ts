import express from 'express';
import { getAllAdminPrincipal, getOneAdminPrincipal, updateOneAdminPrincipal, deleteOneAdminPrincipal } from '../models/admin-principal-model';

const adminPrincipalRouter = express.Router();

//(API): http://localhost:4000/adminprincal
adminPrincipalRouter.get('/findAll', getAllAdminPrincipal);
adminPrincipalRouter.get('/findOne/:id', getOneAdminPrincipal);
adminPrincipalRouter.put('/update/:id', updateOneAdminPrincipal);
adminPrincipalRouter.delete('/delete/:id', deleteOneAdminPrincipal);


export { 
    adminPrincipalRouter,
 };
 