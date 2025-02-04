CREATE DATABASE IF NOT EXISTS GESTPARK;
USE GESTPARK;

-- Table admin_principal
CREATE TABLE admin_principal (
    id_admin_principal INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    num_tel VARCHAR(15) NOT NULL,
    fonction VARCHAR(50)
);

-- Table admin_secondaire
CREATE TABLE admin_secondaire (
    id_admin_secondaire INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    num_tel VARCHAR(15) NOT NULL,
    fonction VARCHAR(50)
);

-- Table employe (sans id_secondaire pour éviter les dépendances circulaires)
CREATE TABLE employe (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    num_tel VARCHAR(15) NOT NULL,
    fonction VARCHAR(50),
    id_admin_principal INT,
    FOREIGN KEY (id_admin_principal) REFERENCES admin_principal(id_admin_principal)
);

-- Table equipement (sans id_salle ni id_secondaire pour éviter dépendances circulaires)
CREATE TABLE equipement (
    id_equipement INT AUTO_INCREMENT PRIMARY KEY,
    marque VARCHAR(100) NOT NULL,
    num_serie VARCHAR(50) UNIQUE NOT NULL,
    statut BOOLEAN DEFAULT TRUE,
    type VARCHAR(50),
    id_utilisateur INT,
    id_admin_secondaire INT,
    FOREIGN KEY (id_utilisateur) REFERENCES employe(id_utilisateur),
    FOREIGN KEY (id_admin_secondaire) REFERENCES admin_secondaire(id_admin_secondaire)
);

-- Table salle (sans id_equipement pour éviter les dépendances circulaires)
CREATE TABLE salle (
    id_salle INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    nb_place INT NOT NULL,
    id_employe INT,
    FOREIGN KEY (id_employe) REFERENCES employe(id_utilisateur)
);

-- Ajout des clés étrangères manquantes après la création des tables
ALTER TABLE salle
ADD COLUMN id_equipement INT,
ADD FOREIGN KEY (id_equipement) REFERENCES equipement(id_equipement);

ALTER TABLE equipement
ADD COLUMN id_salle INT,
ADD FOREIGN KEY (id_salle) REFERENCES salle(id_salle);


ALTER TABLE employe
ADD COLUMN id_admin_secondaire INT,
ADD FOREIGN KEY (id_admin_secondaire) REFERENCES admin_secondaire(id_admin_secondaire);
ALTER TABLE employe
ADD COLUMN id_equipement INT,
ADD FOREIGN KEY (id_equipement) REFERENCES equipement(id_equipement);


-- Insérer un administrateur principal
INSERT INTO admin_principal (nom, prenom, adresse, num_tel, fonction)
VALUES ('Martin', 'Paul', '123 rue des Lilas', '0678901234', 'Directeur Général');

-- Insérer un administrateur secondaire
INSERT INTO admin_secondaire (nom, prenom, adresse, num_tel, fonction)
VALUES ('Durand', 'Alice', '45 avenue des Fleurs', '0789123456', 'Responsable Technique');

-- Insérer un employé avec les relations admin principal et secondaire
INSERT INTO employe (nom, prenom, adresse, num_tel, fonction, id_admin_principal, id_admin_secondaire, id_equipement)
VALUES ('Dupont', 'Jean', '5 rue de Paris', '0123456789', 'Technicien', 1, 1, 1);

-- Insérer un équipement (associé à un utilisateur et un admin secondaire)
INSERT INTO equipement (marque, num_serie, statut, type, id_utilisateur, id_admin_secondaire)
VALUES ('Dell', 'SN123456', TRUE, 'Ordinateur', 1, 1);

-- Insérer une salle avec les relations à un employé et à un équipement
INSERT INTO salle (nom, nb_place, id_employe, id_equipement)
VALUES ('Salle de réunion', 20, 1, 1);