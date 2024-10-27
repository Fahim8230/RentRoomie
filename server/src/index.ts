import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
