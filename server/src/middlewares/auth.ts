import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserController from '../controllers/users-controller';

const controller: UserController = new UserController();

const auth = async (request: Request, response: Response, next: () => void): Promise<void> => {
    const { userName } = request.session;

    const user = await controller.findUser(userName || '');

    if (user.length > 0) {
        next();
    } else {
        const { remember } = request.cookies;

        if (remember) {
            const users = await controller.getUsers();

            await users.forEach(async (user) => {
                const userExists = await bcrypt.compare(user.userName, remember as string);

                if (userExists) {
                    request.session.userName = user.userName;

                    next();
                    return;
                }
            });

            response.status(401).json({ error: 'Unauthorized' });
        } else {
            response.status(401).json({ error: 'Session expired' });
        }
    }
}

export default auth;