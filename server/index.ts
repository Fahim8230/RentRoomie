import express, {Express, Request, Response} from 'express';
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors())

// Start server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
