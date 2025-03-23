import { db } from "../config/db";
import { Request, Response } from "express";
import { AdminPrincipal } from "../utils/types/type";
import { sendResponse } from "../utils/responsFormat";
import { MESSAGE_CODE } from "../utils/types/enum";

// Voir les Admin Principaux
const getAllAdminPrincipal = async (req: Request, res: Response) => {
    try {
        const resultats = await db.query<AdminPrincipal[]>
            ('SELECT * FROM admin_principal');
        sendResponse(
            {
                res,
                success: true,
                statut: 200,
                message: MESSAGE_CODE.LISTE_ADMIN_PRINCIPAL,
                data: resultats.rows,
            });
    } catch (error) {
        sendResponse(
            {
                res,
                success: false,
                statut: 500,
                message: MESSAGE_CODE.LISTE_ADMIN_PRINCIPAL_ERROR,
            });
        console.warn('Error getAllAdminPrincipal:', (error as Error).message);
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
        const resultat = await db.query<AdminPrincipal>
            ('SELECT * FROM admin_principal WHERE id_admin_principal = $1', [id]);
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
        sendResponse(
            {
                res,
                success: false,
                statut: 500,
                message: MESSAGE_CODE.ADMIN_PRINCIPAL_NOT_FOUND,
            });
        console.warn('Error getOneAdminPrincipal:', (error as Error).message);
    }
}



export {
    getAllAdminPrincipal,
    getOneAdminPrincipal,
};

