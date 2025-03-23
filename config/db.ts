import { Client } from "pg";

const db = new Client({
    host: 'localhost',
    user: 'postgres', 
    password: '1234', 
    database: 'GESTPARK',
    port: 5432, 
});

const connectDB = async (): Promise<void> => {
    try {
        await db.connect();
        console.log('✅ Connecté à PostgreSQL');
    } catch (error) {
        console.error('Erreur de connexion à PostgreSQL:', (error as Error).message);
    }
};

export { db, connectDB }; 
