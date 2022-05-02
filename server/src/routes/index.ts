import express, { Router, Response, Request } from 'express';
import students from './students';
import users from './users';

const router = express.Router();

router.use('/students', students);
router.use('/users', users);

router.get('/', (res: Response, req: Request) => {
    // TODO: Handle root endpoint get request
});

export default router;