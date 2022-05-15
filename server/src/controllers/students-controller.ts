import { IStudent, IStudentsData } from "../interfaces/student";
import { readFile, writeFile } from "../utils/file-utils";
import { MongoClient } from 'mongodb';

const filePath: string = './resources/students.json';
const collectionName = 'students';

const DB_TYPE=process.env.DB_TYPE || 'mongodb';
const DB_HOST= process.env.DB_HOST || 'localhost';
const DB_PORT= process.env.DB_PORT || 27017;
const DB_NAME= process.env.DB_NAME || 'web-tech';

export default class StudentsController {
    private studentsData: IStudentsData | undefined;
    private db: any;
    private studentsCollection: any;

    constructor() {
        MongoClient.connect(`${DB_TYPE}://${DB_HOST}:${DB_PORT}`, (error, client) => {
            if (error) {
                client && client.close();
                
                console.error(error);

                return;
            }

            this.db = client && client.db(DB_NAME);
            this.studentsCollection = this.db.collection(collectionName);
        });
    }

    public async getStudentsData(): Promise<IStudentsData | undefined> {
        return await this.studentsCollection.find({});
    }

    public async findStudentByFn(fn: number): Promise<IStudent[]> {
        return await this.studentsCollection.find({ fn });
    }

    public async addStudent(student: IStudent): Promise<IStudent> {
        return await this.studentsCollection.insertOne(student);
    }

    public async updateStudentData(fn: number, studentData: IStudent): Promise<IStudent> {
        return await this.studentsCollection.updateOne(
            { fn },
            { $set: studentData }
        );
    }

    public async deleteStudentData(fn: number): Promise<IStudent> {
        return await this.studentsCollection.deleteOne({ fn });
    }
}