import * as mongoose from 'mongoose';

const connectDb = () => {
    return mongoose.connect(`${process.env.DB_TYPE}://${process.env.DB_NAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
};

export default connectDb;
