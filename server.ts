
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './config/db';
import { adminPrincipalRouter } from './routes/admin-principal-routes';
import { salleRouter } from './routes/salle-routes';
import { adminSecondaireRoute } from './routes/admin-secondaire-routes';
import { employeRoute } from './routes/employe-routes';
import { equipementRoute } from './routes/equipement-routes';

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Connexion à PostgreSQL
connectDB();

// Routes
app.use('/adminprincal', adminPrincipalRouter);
app.use('/salle', salleRouter);
app.use('/adminsecondaire', adminSecondaireRoute);
app.use('/employe', employeRoute);
app.use('/equipemnt', equipementRoute);




app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
module.exports = app;