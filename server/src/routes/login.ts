import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import auth from '../middlewares/auth';
import validateUser from '../middlewares/validateUser';

const login: Router = Router();


login.post('/', validateUser, auth, async (request: Request, response: Response) => {
    const { userName, rememberMe } = request.body;

    const sessionData = request.session;
    sessionData.user = userName;

    if (rememberMe) {
        const hash = await bcrypt.hash(userName, 10);

        response.cookie('remember', hash, {path: '/', maxAge: 9000, httpOnly: false});
        response.set('Set-Cookie', `remeber=${hash}`);
    }

    response.status(200).json({ message: 'Login successful' });
});

export default login;
