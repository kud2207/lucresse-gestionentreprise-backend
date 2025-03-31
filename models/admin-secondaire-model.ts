import { Request, Response } from "express";
import { db } from "../config/db";
import { sendResponse } from "../utils/responsFormat";
import { AdminSecondaire } from "../utils/types/type";
import { MESSAGE_CODE } from "../utils/types/enum";

// Voir tous les admins secondaires
const getAllAdminSecondaire = async (req: Request, res: Response) => {
    try {
        const sql: string = `SELECT * FROM admin_secondaire`;
        const resultats = await db.query<AdminSecondaire[]>(sql);
        sendResponse({
            res,
            success: true,
            statut: 200,
            message: MESSAGE_CODE.LISTE_ADMIN_SECONDAIRE,
            data: resultats.rows,
        });
    } catch (error) {
        console.warn('Error getAllAdminSecondaire:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.LISTE_ADMIN_SECONDAIRE_ERROR,
        });
    }
};

// Voir un admin secondaire
const getOneAdminSecondaire = async (req: Request, res: Response) => {
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
        const sql: string = `SELECT * FROM admin_secondaire WHERE id_admin_secondaire = $1`;
        const resultat = await db.query<AdminSecondaire>(sql, [id]);
        if (resultat.rows.length === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.ADMIN_SECONDAIRE_NOT_FOUND,
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
        console.warn('Error getOneAdminSecondaire:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.ADMIN_ERROR,
        });
    }
};

// Création d'un admin secondaire
const createAdminSecondaire = async (req: Request, res: Response) => {
    const { pwd, nom, prenom, adresse, num_tel, fonction, nom_salle } = req.body;

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
        const sql: string = `INSERT INTO admin_secondaire (pwd, nom, prenom, adresse, num_tel, fonction, nom_salle) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const resultat = await db.query<AdminSecondaire>(sql, [pwd, nom, prenom, adresse, num_tel, fonction, nom_salle]);
        sendResponse({
            res,
            success: true,
            statut: 201,
            message: MESSAGE_CODE.CREATE_SUCCESS,
            data: resultat.rows[0],
        });
    } catch (error) {
        console.warn('Error createAdminSecondaire:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.CREATE_ERROR,
        });
    }
};

// Mise à jour d'un admin secondaire
const updateAdminSecondaire = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom, prenom, adresse, num_tel, fonction, nom_salle } = req.body;

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
        const sql: string = `UPDATE admin_secondaire SET nom = $1, prenom = $2, adresse = $3, num_tel = $4, fonction = $5, nom_salle = $6 WHERE id_admin_secondaire = $7 RETURNING *`;
        const resultat = await db.query<AdminSecondaire>(sql, [nom, prenom, adresse, num_tel, fonction, nom_salle, id]);

        if (resultat.rows.length === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.ADMIN_SECONDAIRE_NOT_FOUND,
            });
        } else {
            sendResponse({
                res,
                success: true,
                statut: 200,
                message: MESSAGE_CODE.UPDATE_SUCCESS,
                data: resultat.rows[0],
            });
        }
    } catch (error) {
        console.warn('Error updateAdminSecondaire:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.UPDATE_ERROR,
        });
    }
};

// Suppression d'un admin secondaire
const deleteAdminSecondaire = async (req: Request, res: Response) => {
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
        const sql: string = `DELETE FROM admin_secondaire WHERE id_admin_secondaire = $1`;
        const resultat = await db.query<AdminSecondaire>(sql, [id]);

        if (resultat.rowCount === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.ADMIN_SECONDAIRE_NOT_FOUND,
            });
        } else {
            sendResponse({
                res,
                success: true,
                statut: 200,
                message: MESSAGE_CODE.DELETE_SUCCESS,
            });
        }
    } catch (error) {
        console.warn('Error deleteAdminSecondaire:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.DELETE_ERROR,
        });
    }
};

export {
    getAllAdminSecondaire,
    getOneAdminSecondaire,
    createAdminSecondaire,
    updateAdminSecondaire,
    deleteAdminSecondaire,
};