# lucresse-gestionentreprise-backend
creation d'un server pour la gestion d'une entreprise avec ExpresJs qui vas interagir avec ma BD en Mysql 

# start
    > npm i : installe les dependance
    > npm start : lance le projet

# code git / githup
 > `git branch` : voir tout les branche et ta branche sera en (*)
 > `git checkout -b nom-de-ta-branche ` : cree une branche
 > `git checkout nom-de-la-branche` : changer vers une branche
 > `git fetch origin nom-de-la-branche` : recuperer une branche et la mettre en local
 > `git checkout nom-de-la-branche`  : bascule sur la branche recuperé
 > `git checkout -b nouvelle-branche nom-de-la-branche` : cree une nouvelle branche apparti d'une branche distante
 > `git push origin initprojet-lucresse` : pour confimer le push d'une branche local a la distante
 > `git merge nomBranche` : on se place sur la branche et on tape la commande apres on tape "git pull origin main"
 > ``
 > ``
 > ``
 > ``
 
 # npm i 
  > `npm install pg` : suite a des petit probleme de conxion avec mysql j'ai pasculé sur postgresql , <sudo systemctl start postgresql> pour activer sur ubuntu

# (22/03/2025) : migration de expres en typescript


# Statut 
  > `200 OK` : Indique que la requête a réussi (ex : récupération des admins).
  > `201 Created` :  créé avec succès.
  > `204 Supression` :  Supression avec succès.
  > `400 Bad Request` : Indique une requête invalide (ex : ID manquant ou invalide).
  > `403 Forbidden` : pas les permissions
  > `404 Not Found` : donnee introuvable
  > `409 Conflict` :  Conflit de données (déjà existant).
  > `422 Unprocessable Entity` : Champs vides ou invalides.
  > `500 Internal Server Error` : Erreur serveur (ex : problème de base de données).
  > `503 Service Unavailable` : Service non disponible.
  > `` :
  > `` :
  > `` :
  > `` :


  # Remarque et de difficulté du projet
  1. # probleme de manipulation de cles etrangere
    ici vue que le nom de la salle est cles etrangere dans les autre table j'ai rencontré le probleme de modification 
     <UPDATE ou DELETE sur la table « salle » viole la contrainte de clé étrangère « equipement_nom_salle_fkey » de la table « equipement »> 
    et ceci pour tout les table alors pour resoudre ce probleme j'ai utiliser deux methode
    `UTILISATION DES COMMIT`
      generalement utilisé lorqu'on souette faire des action sur des multie donneée complementaire 
      et pour garantir que toutes les mises à jour se fassent ensemble.
      l'avantage est que si un a erreur sa vas annuler tout les modification effectué `await db.query('COMMIT')`
       # (BEGIN/COMMIT/ROLLBACK) : generalement fontiione pas c'est plus pour securiser faut l'associer au commit
      `MISE A JOUR AUTOMATIQUEMENT`
      La clause ON UPDATE CASCADE permet de maintenir l'intégrité référentielle des bases de données relationnelles. Elle est appliquée dans le cadre d'une définition de contrainte de clé étrangère dans la table enfant, garantissant que si la clé de la table parent est mise à jour, toutes les clés étrangères correspondantes de la table enfant le sont également. 
      pour utiliser a jaoute sur la ligne de cles etranger `ON UPDATE CASCADE`

      # nous avon egalement ON DELETE CASCADE 
      signifie que, si un client est supprimé de la table Customers (Clients), toutes les lignes de la table Orders (Commandes) contenant la même valeur d'ID client sont également supprimées.