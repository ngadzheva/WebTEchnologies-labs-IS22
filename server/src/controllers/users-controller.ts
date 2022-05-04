import * as bcrypt from 'bcrypt';
import IUser from '../interfaces/user';
import { readFile, writeFile } from '../utils/file-utils';

const filePath: string = './resources/users.json';

class UserController {
    private user: IUser | undefined;

    construct() {} 

    public async createUser(user: IUser): Promise<void> {
        // TODO: Implement
        const passwordHash = await bcrypt.hash(user.password, 10);
        user.password = passwordHash;

        const users = await this.readUsers();
        users.users.push(user);

        await writeFile(filePath, JSON.stringify(users));
    }

    public async findUser(user: string): Promise<IUser[]> {
        const usersObject: { [users: string]: IUser[] } = await this.readUsers();

        return usersObject.users.filter((currUser: IUser) => currUser.userName === user);
    }

    public async readUsers(): Promise<{ [users: string]: IUser[] }> {
        const users: string = await readFile(filePath);
        const usersObject: { [users: string]: IUser[] } = JSON.parse(users);

        return usersObject;
    }

    public isUserNameEmpty(userName: string): boolean {
        return userName === '' || userName === undefined;
    }

    public isPasswordEmpty(password: string): boolean {
        return password === '' || password === undefined;
    }

    public validateUser(user: IUser) {
        // TODO: Implement
        let errors = [];

        if (this.isUserNameEmpty(user.userName)) {
            errors.push('Username is required');
        } else if (user.userName.length > 20) {
            errors.push('Username must be less than 20 symbols');
        }

        if (this.isPasswordEmpty(user.password)) {
            errors.push('Password is required');
        } else if (!user.password.match(/[a-zA-Z0-9]+/)) {
            errors.push('Password must contain letters and digits');
        } else if (user.password.length < 5) {
            errors.push('Password must be longer than 5 symbols');
        }

        return errors;
    }
}

export default UserController;
