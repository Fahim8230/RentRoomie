import express, { Express, Request, Response } from 'express';
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors)

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
