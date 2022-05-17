import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import IUser from '../interfaces/user';
import User, { UserDocument } from '../models/user';

class UserController {
    construct() {} 

    public async createUser(user: IUser): Promise<void> {
        const passwordHash = await bcrypt.hash(user.password, 10);
        user.password = passwordHash;

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: user.userName,
            password: user.password, 
            email: user.email
        });

        await newUser.save();
    }

    public async getUsers(): Promise<UserDocument[]> {
        return await User.find({});
    }

    public async findUser(user: string): Promise<UserDocument[]> {
        return await User.find({ userName: user });
    }

    public isUserNameEmpty(userName: string): boolean {
        return userName === '' || userName === undefined;
    }

    public isPasswordEmpty(password: string): boolean {
        return password === '' || password === undefined;
    }

    public validateUser(user: IUser) {
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
