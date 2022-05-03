import * as bcrypt from 'bcrypt';
import IUser from '../interfaces/user';
import { readFile, writeFile } from '../utils/file-utils';

const filePath: string = './resources/users.json';

class UserController {
    private user: IUser | undefined;

    construct() {} 

    public createUser(user: IUser): void {
        bcrypt.hash(user.password, 10, async (error, hash: string) => {
            if (error) {
                return;
            }

            user.password = hash;

            const usersObject: { [users: string]: IUser[] } = await this.readUsers();
            usersObject.users.push(user);

            await writeFile(filePath, JSON.stringify(usersObject));
        });
    }

    public async findUser(user: string): Promise<IUser[]> {
        const usersObject: { [users: string]: IUser[] } = await this.readUsers();

        return usersObject.users.filter((currUser: IUser) => currUser.userName === user);
    }

    private async readUsers(): Promise<{ [users: string]: IUser[] }> {
        const users: string = await readFile(filePath);
        const usersObject: { [users: string]: IUser[] } = JSON.parse(users);

        return usersObject;
    }

    public validateUser(user: IUser): string[] {
        const errors: string[] = [];

        if (!user.userName) {
            errors.push('Please input user name');
        } else if (user.userName.length > 20) {
            errors.push('User name must be with maximum 20 symbols');
        }

        if (!user.password) {
            errors.push('Please input password');
        } else if (!user.password.match(/[a-zA-z0-9]?/)) {
            errors.push('Password must contain letters and digits');
        } else if (user.password.length < 5) {
            errors.push('Password must be longer then 5 symbols');
        }

        return errors;
    }
}

export default UserController;
