import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';
import session from 'express-session';
import memcached from 'connect-memcached';
import Memcached from 'memcached';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import connectDb from './db/index';

const app = express();

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const MEMCACHED_HOST = process.env.MEMCACHED_HOST || '127.0.0.1';
const MEMCACHED_PORT = process.env.MEMCACHED_PORT || 11211;

declare module 'express-session' {
    export interface SessionData {
        userName: string;
    }
}

const memcahedServer = new Memcached(`${MEMCACHED_HOST}:${MEMCACHED_PORT}`);

const MemcachedStore = memcached(session);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || '',
    saveUninitialized: false,
    resave: false
}));

app.use(router);

connectDb()
    .then(() => {
        console.log('Database connection successful');

        app.listen(SERVER_PORT, () => {
            console.log(`Server is listening on port ${SERVER_PORT}`);
        });
    })
    .catch((error: any) => console.error(`Database connection error: ${error}`));