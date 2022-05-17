import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import validateAuthUser from '../middlewares/validateAuthUser';

const login: Router = Router();


login.post('/', validateAuthUser, async (request: Request, response: Response) => {
    let { userName, rememberMe } = request.body;

    request.session.userName = userName;

    if (rememberMe) {
        const userHash = await bcrypt.hash(userName, 10);

        response.cookie('remember', userHash, { path: '/', maxAge: 60 * 60 * 24 * 30, httpOnly: false });
        response.set('Set-Cookie', `remember=${userHash}`);
    }

    response.status(200).json({ message: 'User logged in successfully' });
});

export default login;
