import mongoose from "mongoose";

const DB_TYPE=process.env.DB_TYPE || 'mongodb';
const DB_HOST= process.env.DB_HOST || 'localhost';
const DB_PORT= process.env.DB_PORT || 27017;
const DB_NAME= process.env.DB_NAME || 'web-tech';

const connectDb = async () => mongoose.connect(`${DB_TYPE}://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

export default connectDb;
