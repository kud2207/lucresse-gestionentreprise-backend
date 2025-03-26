import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './config/db';
import { adminPrincipalRouter } from './routes/admin-principal-routes';
import { salleRouter } from './routes/salle-routes';

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



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
