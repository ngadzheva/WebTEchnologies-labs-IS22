import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserController from '../controllers/users-controller';

const controller: UserController = new UserController();

const auth = async (request: Request, response: Response, next: () => void): Promise<void> => {
    const { userName, password } = request.body;
    console.log(request.cookies)

    try {
        const user = await controller.findUser(userName);
    
        if (user && user.length === 1) {
            bcrypt.compare(password, user[0].password, (error, result: boolean) => {
                if (error) {
                    console.error(error);
                    response.status(400).json({error});
                }

                if (result) {
                    next();
                } else {
                    response.status(401).json({ error: 'Unauthorized' });
                }
            });
        } else {
            const rememberUser: string = request.cookies.remember;

            if (rememberUser) {
                const validUser = await bcrypt.compare(userName, rememberUser);

                if (validUser) {
                    next();
                } else {
                    response.status(401).json({ error: 'Unauthorized' });
                }
            } else {
                response.status(401).json({ error: 'Session expired' });
            }
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error'});
    }
}

export default auth;