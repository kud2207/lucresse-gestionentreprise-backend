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

    try {
        // Update related tables first to avoid foreign key constraint violations
        const sqlEquipementSalle: string = `UPDATE equipement SET nom_salle = $1 WHERE nom_salle = $2`;
        await db.query(sqlEquipementSalle, [nom, nomSalle]);

        const sqlAdminPrinSalle: string = `UPDATE admin_principal SET nom_salle = $1 WHERE nom_salle = $2`;
        await db.query(sqlAdminPrinSalle, [nom, nomSalle]);

        const sqlAdminSecSalle: string = `UPDATE admin_secondaire SET nom_salle = $1 WHERE nom_salle = $2`;
        await db.query(sqlAdminSecSalle, [nom, nomSalle]);

        // Update the salle table after related tables are updated
        const sql: string = `UPDATE salle SET nom = $1, nb_place = $2 WHERE nom = $3 RETURNING *`;
        const resultat = await db.query<Salle>(sql, [nom, nb_place, nomSalle]);
        if (resultat.rows.length === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.SALLE_NOT_EXIST,
            });
        } else {
            try {
                // modification des tables qui ont une relation avec la table salle
                const sqlAdminPrinSalle: string = `UPDATE admin_principal SET nom_salle = $1 WHERE nom_salle = $2`;
                const adminPrinResult = await db.query(sqlAdminPrinSalle, [nom, nomSalle]);

                const sqlAdminSecSalle: string = `UPDATE admin_secondaire SET nom_salle = $1 WHERE nom_salle = $2`;
                const adminSecResult = await db.query(sqlAdminSecSalle, [nom, nomSalle]);

                const sqlEquipementSalle: string = `UPDATE equipement SET nom_salle = $1 WHERE nom_salle = $2`;
                const equipementResult = await db.query(sqlEquipementSalle, [nom, nomSalle]);

                // Vérification que toutes les modifications ont été effectuées
                if (
                    adminPrinResult.rowCount !== null && adminPrinResult.rowCount > 0 &&
                    adminSecResult.rowCount !== null && adminSecResult.rowCount > 0 &&
                    equipementResult.rowCount !== null && equipementResult.rowCount > 0
                ) {
                    sendResponse({
                        res,
                        success: true,
                        statut: 200,
                        message: MESSAGE_CODE.UPDATE_SUCCESS,
                        data: resultat.rows[0],
                    });
                } else {
                    console.warn(" Error updateOneSalle: la modification des tables liées a échoué");
                    sendResponse({
                        res,
                        success: false,
                        statut: 500,
                        message: MESSAGE_CODE.UPDATE_ERROR,
                    });
                }
            } catch (error) {
                console.warn('Error during related table updates:', (error as Error).message);
                sendResponse({
                    res,
                    success: false,
                    statut: 500,
                    message: MESSAGE_CODE.UPDATE_ERROR,
                });
            }
        }


    } catch (error) {
        console.warn('Error updateOneSalle', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.UPDATE_ERROR,
        });
    }
}

export {
    getAllSalle,
    getOneSalle,
    createSalle,
    updateOneSalle

};