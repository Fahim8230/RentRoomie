import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from 'express';
import { connectDB } from "./config/database";
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to RentRoomie API');
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
