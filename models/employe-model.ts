import { Request, Response } from "express";
import { db } from "../config/db";
import { sendResponse } from "../utils/responsFormat";
import { Employe } from "../utils/types/type";
import { MESSAGE_CODE } from "../utils/types/enum";

// Voir tous les employés
const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const sql: string = `SELECT * FROM employees`;
        const resultats = await db.query<Employe[]>(sql);
        sendResponse({
            res,
            success: true,
            statut: 200,
            message: MESSAGE_CODE.LISTE_EMPLOYES,
            data: resultats.rows,
        });
    } catch (error) {
        console.warn('Error getAllEmployees:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.LISTE_EMPLOYE_ERROR,
        });
    }
};

// Voir un employé
const getOneEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        sendResponse({
            res,
            success: false,
            statut: 400,
            message: MESSAGE_CODE.INVALID_ID,
        });
        return;
    }

    try {
        const sql: string = `SELECT * FROM employe WHERE id_utilisateur = $1`;
        const resultat = await db.query<Employe>(sql, [id]);
        if (resultat.rows.length === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.EMPLOYE_NOT_FOUND,
            });
        } else {
            sendResponse({
                res,
                success: true,
                statut: 200,
                message: MESSAGE_CODE.SUCCESS,
                data: resultat.rows[0],
            });
        }
    } catch (error) {
        console.warn('Error getOneEmployee:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.LISTE_EMPLOYE_ERROR,
        });
    }
};

// Création d'un employé
const createEmployee = async (req: Request, res: Response) => {
    const { pwd, nom, prenom, adresse, num_tel, fonction, nom_salle, id_admin_principal, id_admin_secondaire } = req.body;

    if (
        !pwd || !nom || !prenom || !adresse || !num_tel || !fonction || !nom_salle 
    ) {
        sendResponse({
            res,
            success: false,
            statut: 422,
            message: MESSAGE_CODE.CHAMP_EMPTY,
        });
        return;
    }

    try {
        const sql: string = `
            INSERT INTO employe (pwd, nom, prenom, adresse, num_tel, fonction, nom_salle, id_admin_principal, id_admin_secondaire) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        
        const resultat = await db.query<Employe>(sql, [
            pwd, nom, prenom, adresse, num_tel, fonction, nom_salle, id_admin_principal, id_admin_secondaire
        ]);

        sendResponse({
            res,
            success: true,
            statut: 201,
            message: MESSAGE_CODE.EMPLOYE_CREATE_SUCCESS,
            data: resultat.rows[0],
        });
    } catch (error) {
        console.warn('Error createEmployee:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.EMPLOYE_CREATE_ERROR,
        });
    }
};


// Mise à jour d'un employé
const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { pwd, nom, prenom, adresse, num_tel, fonction, nom_salle, id_admin_principal, id_admin_secondaire } = req.body;

    if (!id) {
        sendResponse({
            res,
            success: false,
            statut: 400,
            message: MESSAGE_CODE.INVALID_ID,
        });
        return;
    }

    if (!nom || !prenom || !adresse || !num_tel || !fonction || !nom_salle) {
        sendResponse({
            res,
            success: false,
            statut: 422,
            message: MESSAGE_CODE.CHAMP_EMPTY,
        });
        return;
    }

    try {
        const sql: string = `
            UPDATE employe 
            SET pwd = $1, nom = $2, prenom = $3, adresse = $4, num_tel = $5, fonction = $6, nom_salle = $7, id_admin_principal = $8, id_admin_secondaire = $9 
            WHERE id_employe = $10 
            RETURNING *`;
        
        const resultat = await db.query<Employe>(sql, [
            pwd, nom, prenom, adresse, num_tel, fonction, nom_salle, id_admin_principal, id_admin_secondaire, id
        ]);

        if (resultat.rows.length === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.EMPLOYE_NOT_FOUND,
            });
        } else {
            sendResponse({
                res,
                success: true,
                statut: 200,
                message: MESSAGE_CODE.EMPLOYE_UPDATE_SUCCESS,
                data: resultat.rows[0],
            });
        }
    } catch (error) {
        console.warn('Error updateEmployee:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.EMPLOYE_UPDATE_ERROR,
        });
    }
};


// Suppression d'un employé
const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        sendResponse({
            res,
            success: false,
            statut: 400,
            message: MESSAGE_CODE.INVALID_ID,
        });
        return;
    }

    try {
        const sql: string = `DELETE FROM employees WHERE id_employee = $1`;
        const resultat = await db.query<Employe>(sql, [id]);

        if (resultat.rowCount === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.EMPLOYE_NOT_FOUND,
            });
        } else {
            sendResponse({
                res,
                success: true,
                statut: 200,
                message: MESSAGE_CODE.EMPLOYE_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        console.warn('Error deleteEmployee:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.EMPLOYE_DELETE_ERROR,
        });
    }
};

export {
    getAllEmployees,
    getOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
