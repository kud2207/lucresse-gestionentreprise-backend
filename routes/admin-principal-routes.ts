import express from 'express';
import { getAllAdminPrincipal, getOneAdminPrincipal } from '../models/admin-principal-model';

const adminPrincipalRouter = express.Router();

//(API): http://localhost:4000/adminprincal
adminPrincipalRouter.get('/', getAllAdminPrincipal);
adminPrincipalRouter.get('/:id', getOneAdminPrincipal);


export { 
    adminPrincipalRouter,
 };
