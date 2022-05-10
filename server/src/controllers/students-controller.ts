import { IStudent } from "../interfaces/student";
import { MongoClient } from 'mongodb';

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.DB_NAME || 'web-tech';

const studentsCollection = 'students';

export default class StudentsController {
    private db: any;

    constructor() {
        MongoClient.connect(DB_URL, (error, client) => {
            if (error) {
                (client as MongoClient).close();
                return;
            }
        
            this.db = (client as MongoClient).db(DB_NAME);
        });
    }

    public async getStudentsData(): Promise<string> {
        return await this.db.collection(studentsCollection).find({});
    }

    public async findStudentByFn(fn: number): Promise<IStudent[]> {
        return await this.db.collection(studentsCollection).find({ fn });
    }

    public async addStudent(student: IStudent): Promise<IStudent> {
        return await this.db.collection(studentsCollection).insertOne(student);
    }

    public async updateStudentData(fn: number, studentData: IStudent): Promise<IStudent> {
        return await this.db.collection(studentsCollection).updateOne(
            { fn },
            { $set: studentData }
        );
    }

    public async deleteStudentData(fn: number): Promise<IStudent> {
        return await this.db.collection(studentsCollection).deleteOne({ fn });
    }
}