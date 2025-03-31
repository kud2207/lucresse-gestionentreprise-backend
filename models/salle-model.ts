import { Request, Response } from "express";
import { db } from "../config/db";
import { sendResponse } from "../utils/responsFormat";
import { Salle } from "../utils/types/type";
import { MESSAGE_CODE } from "../utils/types/enum";


//Voir les salles 
const getAllSalle = async (req: Request, res: Response) => {
    try {
        var sql: string = `SELECT * FROM salle`
        const resultats = await db.query<Salle[]>(sql);
        sendResponse(
            {
                res,
                success: true,
                statut: 200,
                message: MESSAGE_CODE.LISTE_SALLE,
                data: resultats.rows,
            });
    } catch (error) {
        console.warn('Error getAllSalle:', (error as Error).message);
        sendResponse(
            {
                res,
                success: false,
                statut: 500,
                message: MESSAGE_CODE.LISTE_SALLE_ERROR,
            });
    }
}

//Voir une Salle
const getOneSalle = async (req: Request, res: Response) => {
    const { nomSalle } = req.params
    if (!nomSalle) {
        sendResponse(
            {
                res,
                success: false,
                statut: 400,
                message: MESSAGE_CODE.INVALID_ID,
            });
        return;
    }

    try {
        const sql: string = `SELECT * FROM salle WHERE nom = $1`
        const resultat = await db.query<Salle>(sql, [nomSalle]);
        if (resultat.rows.length === 0) {
            sendResponse(
                {
                    res,
                    success: false,
                    statut: 404,
                    message: MESSAGE_CODE.SALLE_NOT_FOUND,
                });
        } else {
            sendResponse(
                {
                    res,
                    success: true,
                    statut: 200,
                    message: MESSAGE_CODE.SUCCESS,
                    data: resultat.rows,
                });
        }

    } catch (error) {
        console.warn('Error getOneSalle ', (error as Error).message);
        sendResponse(
            {
                res,
                success: false,
                statut: 500,
                message: MESSAGE_CODE.ADMIN_ERROR,
            });
    }
}

//Creation d'une salle
const createSalle = async (req: Request, res: Response) => {
    const { nom, nb_place } = req.body;
    if (!nom || !nb_place) {
        sendResponse(
            {
                res,
                success: false,
                statut: 422,
                message: MESSAGE_CODE.CHAMP_EMPTY,
            });
        return;
    }
    try {
        const sql: string = `INSERT INTO salle (nom, nb_place) VALUES ($1, $2) RETURNING *`
        const resultat = await db.query<Salle>(sql, [nom, nb_place]);
        sendResponse(
            {
                res,
                success: true,
                statut: 201,
                message: MESSAGE_CODE.CREATE_SUCCESS,
                data: resultat.rows[0],
            });
    } catch (error) {
        console.warn('Error createSalle:', (error as Error).message);
        sendResponse(
            {
                res,
                success: false,
                statut: 500,
                message: MESSAGE_CODE.CREATE_ERROR,
            });
    }
}

//update une salle
const updateOneSalle = async (req: Request, res: Response) => {
    const { nomSalle } = req.params;
    const { nom, nb_place } = req.body;

    try {
        if (!nomSalle) {
            sendResponse({
                res,
                success: false,
                statut: 400,
                message: MESSAGE_CODE.INVALID_ID,
            });
            return;
        }
        if (!nom || !nb_place) {
            sendResponse({
                res,
                success: false,
                statut: 422,
                message: MESSAGE_CODE.CHAMP_EMPTY,
            });
            return;
        }

        // Commencer une transaction
        await db.query('BEGIN');

        // Mettre à jour la table salle (pour changer le nom)
        const sqlUpdateSalle = `UPDATE salle SET nom = $1, nb_place = $2 WHERE nom = $3 RETURNING *`;
        const resultat = await db.query<Salle>(sqlUpdateSalle, [nom, nb_place, nomSalle]);

        if (resultat.rows.length === 0) {
            sendResponse({
                res,
                success: false,
                statut: 400,
                message: MESSAGE_CODE.SALLE_UPDATE_ERROR,
            });
            return;
        }

        const sqlEquipementSalle = `UPDATE equipement SET nom_salle = $1 WHERE nom_salle = $2`;
        const sqlAdminPrinSalle = `UPDATE admin_principal SET nom_salle = $1 WHERE nom_salle = $2`;
        const sqlAdminSecSalle = `UPDATE admin_secondaire SET nom_salle = $1 WHERE nom_salle = $2`;

        await db.query(sqlEquipementSalle, [nom, nomSalle]);
        await db.query(sqlAdminPrinSalle, [nom, nomSalle]);
        await db.query(sqlAdminSecSalle, [nom, nomSalle]);

        // Valider la transaction
        await db.query('COMMIT');

        sendResponse({
            res,
            success: true,
            statut: 200,
            message: MESSAGE_CODE.UPDATE_SUCCESS,
            data: resultat.rows[0],
        });

    } catch (error) {
        // Annuler les changements en cas d'erreur
        await db.query('ROLLBACK');
        console.warn('Error updateOneSalle', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.UPDATE_ERROR,
        });
    }
};

//suprimer un salle
const deleteOneSalle = async (req: Request, res: Response) => {
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

        const sql: string = `DELETE FROM salle WHERE id_salle = $1`
        const resultat = await db.query<Salle>(sql, [id]);
        if (resultat.rowCount === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.SALLE_NOT_FOUND,
            });
        }

        sendResponse({
            res,
            success: true,
            statut: 200, //meiux serais 204
            message: MESSAGE_CODE.DELETE_SUCCESS,
        });

    } catch (error) {
        console.warn('Error deleteOneSalle:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.DELETE_ERROR,
        });
    }
}


export {
    getAllSalle,
    getOneSalle,
    createSalle,
    updateOneSalle,
    deleteOneSalle
};