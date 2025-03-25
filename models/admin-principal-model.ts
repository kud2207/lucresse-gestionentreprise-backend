import { db } from "../config/db";
import { Request, Response } from "express";
import { AdminPrincipal } from "../utils/types/type";
import { sendResponse } from "../utils/responsFormat";
import { MESSAGE_CODE } from "../utils/types/enum";

// Voir les Admin Principaux
const getAllAdminPrincipal = async (req: Request, res: Response) => {
    try {
        var sql: string = `SELECT * FROM admin_principal`
        const resultats = await db.query<AdminPrincipal[]>(sql);
        sendResponse(
            {
                res,
                success: true,
                statut: 200,
                message: MESSAGE_CODE.LISTE_ADMIN_PRINCIPAL,
                data: resultats.rows,
            });
    } catch (error) {
        console.warn('Error getAllAdminPrincipal:', (error as Error).message);
        sendResponse(
            {
                res,
                success: false,
                statut: 500,
                message: MESSAGE_CODE.LISTE_ADMIN_PRINCIPAL_ERROR,
            });
    }
}

// Voir un Admin Principal
const getOneAdminPrincipal = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
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
        const sql: string = `SELECT * FROM admin_principal WHERE id_admin_principal = $1`
        const resultat = await db.query<AdminPrincipal>(sql, [id]);
        if (resultat.rows.length === 0) {
            sendResponse(
                {
                    res,
                    success: false,
                    statut: 404,
                    message: MESSAGE_CODE.ADMIN_PRINCIPAL_NOT_FOUND,
                });
        } else {
            sendResponse(
                {
                    res,
                    success: true,
                    statut: 200,
                    message: MESSAGE_CODE.SUCCESS,
                    data: resultat.rows[0],
                });
        }

    } catch (error) {
        console.warn('Error getOneAdminPrincipal:', (error as Error).message);
        sendResponse(
            {
                res,
                success: false,
                statut: 500,
                message: MESSAGE_CODE.ADMIN_PRINCIPAL_NOT_FOUND,
            });
    }
}

//modifier un admin
const updateOneAdminPrincipal = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { pwd, nom, prenom, adresse, num_tel, fonction, nom_salle } = req.body;


    if (!id) {
        sendResponse({
            res,
            success: false,
            statut: 400,
            message: MESSAGE_CODE.INVALID_ID,
        });
        return;
    }

    if (!pwd || !nom || !prenom || !adresse || !num_tel || !fonction || !nom_salle) {
        sendResponse({
            res,
            success: false,
            statut: 422,
            message: MESSAGE_CODE.CHAMP_EMPTY,
        });
        return;
    }

    try {
        const sql = `
            UPDATE admin_principal 
            SET pwd = $1, nom = $2, prenom = $3, adresse = $4, 
                num_tel = $5, fonction = $6, nom_salle = $7 
            WHERE id_admin_principal = $8
            RETURNING *`; // Pour retourner les données mises à jour

        const updateResult = await db.query(sql, [pwd, nom, prenom, adresse, num_tel, fonction, nom_salle, id]);

        if (updateResult.rowCount === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.ADMIN_PRINCIPAL_NOT_FOUND,
            });
            return;
        }

        sendResponse({
            res,
            success: true,
            statut: 200,
            message: MESSAGE_CODE.UPDATE_SUCCESS,
            data: updateResult.rows,
        });

    } catch (error) {
        console.warn('Error updateOneAdminPrincipal:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.UPDATE_ERROR,
        });
    }
};

//suprimer un administrateur
const deleteOneAdminPrincipal = async(req : Request, res : Response)=>{
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
        const sql = `DELETE FROM admin_principal WHERE id_admin_principal = $1`;
        const deleteResult = await db.query(sql, [id]);

        if (deleteResult.rowCount === 0) {
            sendResponse({
                res,
                success: false,
                statut: 404,
                message: MESSAGE_CODE.ADMIN_PRINCIPAL_NOT_FOUND,
            })
            return;
        }
        sendResponse({
            res,
            success: true,
            statut: 200,
            message: MESSAGE_CODE.DELETE_SUCCESS,
        });
        return;
        
        
    } catch (error) {
        console.warn('Error deleteOneAdminPrincipal:', (error as Error).message);
        sendResponse({
            res,
            success: false,
            statut: 500,
            message: MESSAGE_CODE.DELETE_ERROR,
        });
    }

}


export {
    getAllAdminPrincipal,
    getOneAdminPrincipal,
    updateOneAdminPrincipal,
    deleteOneAdminPrincipal
};

