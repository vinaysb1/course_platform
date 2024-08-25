import express from 'express';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
