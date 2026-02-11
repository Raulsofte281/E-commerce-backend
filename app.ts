import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import userRouter from './routes/user.route';

dotenv.config();

const app = express();
app.use(express.json());

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use('/api', userRouter); 

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'Conectado ao Supabase!', 
      time: result.rows[0].now 
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao conectar no banco' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});