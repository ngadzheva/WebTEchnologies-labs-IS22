import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import students from './routes/students';

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// app.use((req, res) => {
//     console.log(req.url);
//     console.log(req.method);
//     console.log(req.headers);

//     console.log(req.body);

//     console.log(req);

//     res.status(200).send('Hello, world!');
// });

app.use('/students', students);
// app.use('/users', users);

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}`));