import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index';

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(router);

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}`));