export enum MESSAGE_CODE {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    INVALID_ID = "ID invalide",
    UPDATE_SUCCESS = "UPDATE_SUCCESS",
    UPDATE_ERROR = "UPDATE_ERROR",
    DELETE_SUCCESS = "DELETE_SUCCESS",
    DELETE_ERROR = "DELETE_ERROR",
    CREATE_SUCCESS = "CREATE_SUCCESS",
    CREATE_ERROR = "CREATE_ERROR",
    LISTE_ADMIN_PRINCIPAL = "Liste des administrateurs principaux",
    LISTE_ADMIN_PRINCIPAL_ERROR = "Erreur lors de la récupération de la liste des administrateurs principaux",
    ADMIN_ERROR = "REQUETTE ADMIN ERROR",
    ADMIN_PRINCIPAL_NOT_FOUND = "Administrateur principal non trouvé",
    CHAMP_EMPTY = "Vous avez envoyé des champs vides lors de la modification.",
    LISTE_SALLE = "Liste des salles",
    LISTE_SALLE_ERROR = "Erreur lors de la récupération de la liste des salles",
    SALLE_NOT_FOUND = "Salle non trouvée",
    SALLE_NOT_EXIST = "La salle n'existe pas",
    SALLE_EXIST = "La salle existe déjà",
    SALLE_UPDATE_ERROR = "Erreur lors de la mise à jour de la salle",
}