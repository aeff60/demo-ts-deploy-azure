import express, { Request, Response } from 'express';

const app = express();
const port = 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is your TypeScript API!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
