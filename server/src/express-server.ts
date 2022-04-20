import * as express from 'express';
import students from './routes/students';

const app = express();

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

app.listen(3001, () => console.log('Server is listening on port 3001'));