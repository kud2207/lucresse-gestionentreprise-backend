import { Request, Response } from "express";
import { db } from "../config/db";
import { sendResponse } from "../utils/responsFormat";
import { Equipement } from "../utils/types/type";
import { MESSAGE_CODE } from "../utils/types/enum";

// Voir tous les équipements
const getAllEquipements = async (req: Request, res: Response) => {
    try {
        const sql: string = `SELECT * FROM equipement`;
        const resultats = await db.query<Equipement[]>(sql);
        sendResponse({
            res,
            success: true,
            statut: 200,
            message: MESSAGE_CODE.LISTE_EQUIPEMENTS,
            data: resultats.rows,
        });
    } catch (error) {
        console.warn('Error getAllEquipements:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.LISTE_EQUIPEMENTS_ERROR,
        });
    }
};

// Voir un équipement
const getOneEquipement = async (req: Request, res: Response) => {
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
        const sql: string = `SELECT * FROM equipement WHERE id_equipement = $1`;
        const resultat = await db.query<Equipement>(sql, [id]);
        if (resultat.rows.length === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.EQUIPEMENT_NOT_FOUND,
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
        console.warn('Error getOneEquipement:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.EQUIPEMENT_ERROR,
        });
    }
};

// Création d'un équipement
const createEquipement = async (req: Request, res: Response) => {
    const { marque, num_serie, statut, type, nom_salle, id_admin_principal, id_admin_secondaire } = req.body;

    if (!marque || !num_serie || !type) {
        sendResponse({
            res,
            success: false,
            statut: 422,
            message: MESSAGE_CODE.CHAMP_EMPTY,
        });
        return;
    }
    try {
        const sql: string = `INSERT INTO equipement (marque, num_serie, statut, type, nom_salle, id_admin_principal, id_admin_secondaire) 
                             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const resultat = await db.query<Equipement>(sql, [marque, num_serie, statut, type, nom_salle, id_admin_principal, id_admin_secondaire]);
        sendResponse({
            res,
            success: true,
            statut: 201,
            message: MESSAGE_CODE.CREATE_SUCCESS,
            data: resultat.rows[0],
        });
    } catch (error) {
        console.warn('Error createEquipement:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.CREATE_ERROR,
        });
    }
};

// Mise à jour d'un équipement
const updateEquipement = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { marque, num_serie, statut, type, nom_salle, id_admin_principal, id_admin_secondaire } = req.body;

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
        const sql: string = `UPDATE equipement 
                             SET marque = $1, num_serie = $2, statut = $3, type = $4, nom_salle = $5, id_admin_principal = $6, id_admin_secondaire = $7 
                             WHERE id_equipement = $8 RETURNING *`;
        const resultat = await db.query<Equipement>(sql, [marque, num_serie, statut, type, nom_salle, id_admin_principal, id_admin_secondaire, id]);

        if (resultat.rows.length === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.EQUIPEMENT_NOT_FOUND,
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
        console.warn('Error updateEquipement:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.UPDATE_ERROR,
        });
    }
};

// Suppression d'un équipement
const deleteEquipement = async (req: Request, res: Response) => {
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
        const sql: string = `DELETE FROM equipement WHERE id_equipement = $1`;
        const resultat = await db.query<Equipement>(sql, [id]);
        if (resultat.rowCount === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.EQUIPEMENT_NOT_FOUND,
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
        console.warn('Error deleteEquipement:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.DELETE_ERROR,
        });
    }
};

export {
    getAllEquipements,
    getOneEquipement,
    createEquipement,
    updateEquipement,
    deleteEquipement,
};
