import {Response } from "express";
export interface AdminPrincipal {
    id_admin_principal: number;
    nom: string;
    prenom: string;
    adresse :string;
    num_tel: string;
    fonction :string;
}

export interface ApiResponce <T = null>{
    res: Response;
    success: boolean;
    statut: number;
    message: string;
    data?: T;
}