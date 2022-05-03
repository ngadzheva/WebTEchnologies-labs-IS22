import express, { Request, Response } from 'express';
import UserController from '../controllers/users-controller';
import IUser from '../interfaces/user';
import validateUser from '../middlewares/validateUser';

const users = express.Router();

let usersController: UserController;

const getUsersController = (req: Request, res: Response, next: () => void) => {
    try {
        usersController = new UserController();

        next();
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

users.use(getUsersController);

users.post('/', validateUser, async (req: Request, res: Response) => {
    const { userName, password, email } = req.body;

    const user: IUser = { userName, password, email };

    try {
        await usersController.createUser(user);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'}); 
    }
});

export default users;