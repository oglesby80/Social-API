import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './models/controllers/routes/userRoutes';
import thoughtRoutes from './models/controllers/routes/thoughtRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB')
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection error:', error));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

