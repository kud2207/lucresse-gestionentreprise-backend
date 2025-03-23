-- Création de la base de données
CREATE DATABASE GESTPARK;
\c GESTPARK;

-- Table salle
CREATE TABLE salle (
    id_salle SERIAL PRIMARY KEY,
    nom VARCHAR(100) UNIQUE NOT NULL,
    nb_place INT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table admin_principal
CREATE TABLE admin_principal (
    id_admin_principal SERIAL PRIMARY KEY,
    pwd VARCHAR(20) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    num_tel VARCHAR(15) NOT NULL,
    fonction VARCHAR(50),
    nom_salle VARCHAR(100) REFERENCES salle(nom) ON DELETE SET NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table admin_secondaire
CREATE TABLE admin_secondaire (
    id_admin_secondaire SERIAL PRIMARY KEY,
    pwd VARCHAR(20) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    num_tel VARCHAR(15) NOT NULL,
    fonction VARCHAR(50),
    nom_salle VARCHAR(100) REFERENCES salle(nom) ON DELETE SET NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table employe
CREATE TABLE employe (
    id_utilisateur SERIAL PRIMARY KEY,
    pwd VARCHAR(20) NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    num_tel VARCHAR(15) NOT NULL,
    fonction VARCHAR(50),
    nom_salle VARCHAR(100) REFERENCES salle(nom) ON DELETE SET NULL,
    id_admin_principal INT REFERENCES admin_principal(id_admin_principal) ON DELETE SET NULL,
    id_admin_secondaire INT REFERENCES admin_secondaire(id_admin_secondaire) ON DELETE SET NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table equipement
CREATE TABLE equipement (
    id_equipement SERIAL PRIMARY KEY,
    marque VARCHAR(100) NOT NULL,
    num_serie VARCHAR(50) UNIQUE NOT NULL,
    statut BOOLEAN DEFAULT TRUE,
    type VARCHAR(50),
    nom_salle VARCHAR(100) REFERENCES salle(nom) ON DELETE SET NULL,
    id_admin_principal INT REFERENCES admin_principal(id_admin_principal) ON DELETE SET NULL,
    id_admin_secondaire INT REFERENCES admin_secondaire(id_admin_secondaire) ON DELETE SET NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des salles
INSERT INTO salle (nom, nb_place)
VALUES 
('Salle de réunion A', 20),
('Salle de réunion B', 15),
('Salle de conférence', 50),
('Salle de formation', 30);

-- Insertion des administrateurs principaux
INSERT INTO admin_principal (pwd, nom, prenom, adresse, num_tel, fonction, nom_salle)
VALUES 
('1234', 'KAGEU', 'Ulrich', '123 rue des Lilas', '+33678901234', 'Directeur Général', 'Salle de réunion A');

-- Insertion des administrateurs secondaires
INSERT INTO admin_secondaire (pwd, nom, prenom, adresse, num_tel, fonction, nom_salle)
VALUES 
('1234', 'Durand', 'Alice', '45 avenue des Fleurs', '+33789123456', 'Responsable Technique', 'Salle de réunion B'),
('1234', 'Leroy', 'Sophie', '67 boulevard des Roses', '+33612345678', 'Responsable Maintenance', 'Salle de conférence'),
('1234', 'Moreau', 'Pierre', '89 rue des Chênes', '+33698765432', 'Responsable Sécurité', 'Salle de formation');

-- Insertion des employés
INSERT INTO employe (pwd, nom, prenom, adresse, num_tel, fonction, nom_salle, id_admin_principal, id_admin_secondaire)
VALUES 
('1234', 'Dupont', 'Jean', '5 rue de Paris', '+33123456789', 'Technicien', 'Salle de réunion A', 1, NULL),
('1234', 'Bernard', 'Marie', '10 avenue des Champs', '+33234567891', 'Ingénieur', 'Salle de réunion B', 1, NULL),
('1234', 'Petit', 'Luc', '15 rue de Lyon', '+33345678912', 'Développeur', 'Salle de conférence', NULL, 3),
('1234', 'Robert', 'Julie', '20 boulevard des Alpes', '+33456789123', 'Chef de projet', 'Salle de formation', NULL, 3),
('1234', 'Richard', 'Thomas', '25 rue de Marseille', '+33567891234', 'Analyste', 'Salle de réunion A', NULL, 2),
('1234', 'Durand', 'Claire', '30 avenue des Platanes', '+33678912345', 'Designer', 'Salle de réunion B', 1, NULL);


-- Insertion des équipements
INSERT INTO equipement (marque, num_serie, statut, type, nom_salle, id_admin_principal, id_admin_secondaire)
VALUES 
('Dell', 'SN123456', TRUE, 'Ordinateur', 'Salle de réunion A', NULL, 1),
('HP', 'SN234567', TRUE, 'Ordinateur', 'Salle de réunion B', NULL, 2),
('Lenovo', 'SN345678', TRUE, 'Ordinateur', 'Salle de conférence', 1, NULL),
('Apple', 'SN456789', TRUE, 'Ordinateur', 'Salle de formation', NULL, 3),
('Asus', 'SN567890', TRUE, 'Ordinateur', 'Salle de réunion A', NULL, 1),
('Acer', 'SN678901', FALSE, 'Ordinateur', 'Salle de réunion B', NULL, 2),
('Dell', 'SN789012', FALSE, 'Ordinateur', 'Salle de conférence', 1, NULL),
('HP', 'SN890123', TRUE, 'Imprimante', 'Salle de formation', NULL, 3),
('Epson', 'SN901234', TRUE, 'Imprimante', 'Salle de réunion A', NULL, 2),
('Canon', 'SN012345', FALSE, 'Imprimante', 'Salle de réunion B', NULL, 3),
('Dell', 'SN123450', TRUE, 'Serveur', 'Salle de conférence', NULL, 1),
('HP', 'SN234561', TRUE, 'Serveur', 'Salle de formation', NULL, 3),
('Lenovo', 'SN345672', TRUE, 'Serveur', 'Salle de réunion A', NULL, 3),
('Apple', 'SN456783', FALSE, 'Tablette', 'Salle de réunion B', NULL, 1),
('Samsung', 'SN567894', FALSE, 'Tablette', 'Salle de conférence', 1, NULL),
('Microsoft', 'SN678905', TRUE, 'Tablette', 'Salle de formation', 1, NULL),
('Asus', 'SN789016', TRUE, 'Tablette', 'Salle de réunion A', 1, NULL),
('Acer', 'SN890127', TRUE, 'Tablette', 'Salle de réunion B', 1, NULL),
('Dell', 'SN78901k6', FALSE, 'Écran', 'Salle de réunion A', NULL, 1),
('HP', 'SN8901k27', TRUE, 'Écran', 'Salle de réunion B', NULL, 3),
('LG', 'SN90n238', TRUE, 'Écran', 'Salle de conférence', NULL, 3),
('Sony', 'SN012349', TRUE, 'Projecteur', 'Salle de formation', 1, NULL);
