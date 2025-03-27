import {Response } from "express";

export interface AdminPrincipal {
    id_admin_principal: number;
    nom: string;
    prenom: string;
    adresse :string; 
    num_tel: string;
    fonction :string;
};

export interface ApiResponce <T = null>{
    res: Response;
    success: boolean;
    statut: number;
    message: string;
    data?: T;
};

export interface Salle {
    nom: string;
    nb_place: number;
};


export interface AdminSecondaire {
    id_admin_secondaire: number;
    nom: string;
    prenom: string;
    adresse: string;
    num_tel: string;
    fonction: string;
    nom_salle?: string;
    update_employe: boolean;
    update_equipement: boolean;
    update_salle: boolean;
    date_creation: Date;
}

export interface Employe {
    id_utilisateur: number;
    nom: string;
    prenom: string;
    adresse: string;
    num_tel: string;
    fonction: string;
    nom_salle?: string;
    id_admin_principal?: number;
    id_admin_secondaire?: number;
    date_creation: Date;
}

export interface Equipement {
    id_equipement: number;
    marque: string;
    num_serie: string;
    statut: boolean;
    type?: string;
    nom_salle?: string;
    id_admin_principal?: number;
    id_admin_secondaire?: number;
    date_creation: Date;
}

// Interface pour une requête générique avec pagination
export interface ApiResponse<T = null> {
    res: Response;
    success: boolean;
    statut: number;
    message: string;
    data?: T;
    pagination?: {
        total: number;
        page: number;
        limit: number;
    };
}

// Interface pour les requêtes de mise à jour d'une salle
export interface UpdateSalleRequest {
    nom: string;
    nb_place: number;
}

// Interface pour une requête de création d'un administrateur
export interface CreateAdminRequest {
    nom: string;
    prenom: string;
    adresse?: string;
    num_tel: string;
    fonction: string;
    nom_salle?: string;
}

// Interface pour une requête de création d'un employé
export interface CreateEmployeRequest {
    nom: string;
    prenom: string;
    adresse?: string;
    num_tel: string;
    fonction: string;
    nom_salle?: string;
    id_admin_principal?: number;
    id_admin_secondaire?: number;
}

// Interface pour la requête de connexion
export interface LoginRequest {
    num_tel: string;
    password: string;
}

// Interface pour la réponse de connexion
export interface LoginResponse {
    token: string;
    user: AdminPrincipal | AdminSecondaire | Employe;
}
