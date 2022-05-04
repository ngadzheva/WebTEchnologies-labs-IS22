import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserController from '../controllers/users-controller';
import IUser from '../interfaces/user';

const controller: UserController = new UserController();

const validateAuthUser = async (request: Request, response: Response, next: () => void): Promise<void> => {
    // TODO: Implement
    let { userName, password } = request.body;

    if (controller.isUserNameEmpty(userName) || controller.isPasswordEmpty(password)) {
        response.status(400).json({ error: 'Username and password are required' });
        return;
    }

    const user = await controller.findUser(userName);

    if (user.length > 0) {
        response.status(401).json({ error: 'Username or password is invalid' });
        return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

    if (isPasswordCorrect) {
        next();
    } else {
        response.status(401).json({ error: 'Username or password is invalid' });
    }
}

export default validateAuthUser;