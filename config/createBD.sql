-- Création de la base de données
CREATE DATABASE GESTPARK;
\c GESTPARK;

-- Table admin_principal
CREATE TABLE admin_principal (
    id_admin_principal SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    num_tel VARCHAR(15) NOT NULL,
    fonction VARCHAR(50)
);

-- Table admin_secondaire
CREATE TABLE admin_secondaire (
    id_admin_secondaire SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    num_tel VARCHAR(15) NOT NULL,
    fonction VARCHAR(50)
);

-- Table employe
CREATE TABLE employe (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    num_tel VARCHAR(15) NOT NULL,
    fonction VARCHAR(50),
    id_admin_principal INT REFERENCES admin_principal(id_admin_principal) ON DELETE SET NULL,
    id_admin_secondaire INT REFERENCES admin_secondaire(id_admin_secondaire) ON DELETE SET NULL
);

-- Table salle
CREATE TABLE salle (
    id_salle SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    nb_place INT NOT NULL,
    id_employe INT REFERENCES employe(id_utilisateur) ON DELETE SET NULL
);

-- Table equipement
CREATE TABLE equipement (
    id_equipement SERIAL PRIMARY KEY,
    marque VARCHAR(100) NOT NULL,
    num_serie VARCHAR(50) UNIQUE NOT NULL,
    statut BOOLEAN DEFAULT TRUE,
    type VARCHAR(50),
    id_utilisateur INT REFERENCES employe(id_utilisateur) ON DELETE SET NULL,
    id_admin_secondaire INT REFERENCES admin_secondaire(id_admin_secondaire) ON DELETE SET NULL,
    id_salle INT REFERENCES salle(id_salle) ON DELETE SET NULL
);

-- Insertion des administrateurs principaux
INSERT INTO admin_principal (nom, prenom, adresse, num_tel, fonction)
VALUES ('Martin', 'Paul', '123 rue des Lilas', '0678901234', 'Directeur Général');

-- Insertion des administrateurs secondaires
INSERT INTO admin_secondaire (nom, prenom, adresse, num_tel, fonction)
VALUES 
('Durand', 'Alice', '45 avenue des Fleurs', '0789123456', 'Responsable Technique'),
('Leroy', 'Sophie', '67 boulevard des Roses', '0612345678', 'Responsable Maintenance'),
('Moreau', 'Pierre', '89 rue des Chênes', '0698765432', 'Responsable Sécurité');

-- Insertion des employés
INSERT INTO employe (nom, prenom, adresse, num_tel, fonction, id_admin_principal, id_admin_secondaire)
VALUES 
('Dupont', 'Jean', '5 rue de Paris', '0123456789', 'Technicien', NULL, 1),
('Bernard', 'Marie', '10 avenue des Champs', '0234567891', 'Ingénieur', 1, NULL),
('Petit', 'Luc', '15 rue de Lyon', '0345678912', 'Développeur', NULL, 3),
('Robert', 'Julie', '20 boulevard des Alpes', '0456789123', 'Chef de projet', NULL, 1),
('Richard', 'Thomas', '25 rue de Marseille', '0567891234', 'Analyste', 1, NULL),
('Durand', 'Claire', '30 avenue des Platanes', '0678912345', 'Designer', 1, NULL),
('Dubois', 'Nicolas', '35 rue de Bordeaux', '0789123456', 'Testeur', NULL, 1);

-- Insertion des équipements
INSERT INTO equipement (marque, num_serie, statut, type, id_utilisateur, id_admin_secondaire)
VALUES 
('Dell', 'SN123456', TRUE, 'Ordinateur', 1, 1),
('HP', 'SN234567', TRUE, 'Ordinateur', 2, 2),
('Lenovo', 'SN345678', TRUE, 'Ordinateur', 3, 3),
('Apple', 'SN456789', TRUE, 'Ordinateur', 4, 1),
('Asus', 'SN567890', TRUE, 'Ordinateur', 5, 2),
('Acer', 'SN678901', TRUE, 'Ordinateur', 6, 3),
('Dell', 'SN789012', TRUE, 'Ordinateur', 7, 1),
('HP', 'SN890123', TRUE, 'Imprimante', NULL, 1),
('Epson', 'SN901234', TRUE, 'Imprimante', NULL, 2),
('Canon', 'SN012345', TRUE, 'Imprimante', NULL, 3),
('Dell', 'SN123450', TRUE, 'Serveur', NULL, 1),
('HP', 'SN234561', TRUE, 'Serveur', NULL, 2),
('Lenovo', 'SN345672', TRUE, 'Serveur', NULL, 3),
('Apple', 'SN456783', TRUE, 'Tablette', NULL, 1),
('Samsung', 'SN567894', TRUE, 'Tablette', NULL, 2),
('Microsoft', 'SN678905', TRUE, 'Tablette', NULL, 3),
('Dell', 'SN789016', TRUE, 'Écran', NULL, 1),
('HP', 'SN890127', TRUE, 'Écran', NULL, 2),
('LG', 'SN901238', TRUE, 'Écran', NULL, 3),
('Sony', 'SN012349', TRUE, 'Projecteur', NULL, 1);

-- Insertion des salles
INSERT INTO salle (nom, nb_place, id_employe)
VALUES 
('Salle de réunion A', 20, 1),
('Salle de réunion B', 15, 2),
('Salle de conférence', 50, 3),
('Salle de formation', 30, 4);