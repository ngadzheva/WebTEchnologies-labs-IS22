import { Request, Response } from 'express';
import UserController from '../controllers/users-controller';
import IUser from '../interfaces/user';

const controller: UserController = new UserController();

const validateUser = async (request: Request, response: Response, next: () => void): Promise<void> => {
    const { userName, password } = request.body;

    const user: IUser = { userName, password };
    const isValid = controller.validateUser(user);

    if (isValid.length > 0) { 
        response.status(400).json({ errors: isValid });
    } else {
        const userFound = await controller.findUser(userName);

        if (userFound.length > 0) {
            response.status(400).json({ errors: 'User already exists' });
        } else {
            next();
        }
    }
}

export default validateUser;