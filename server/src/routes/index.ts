import express, { Router, Response, Request } from 'express';
import login from './login';
import students from './students';
import users from './users';

const router = express.Router();

router.use('/students', students);
router.use('/users', users);
router.use('/login', login);

// router.get('/', (res: Response, req: Request) => {
//     // TODO: Handle root endpoint get request
//     const rememberUser: string = req.cookies.remember;

//     if (rememberUser) {
//         // {success: true}
//         res.redirect('studets/marks');
//     } else {
//         // {success: false}
//         res.redirect('login');
//     }
// });

export default router;