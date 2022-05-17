import mongoose from "mongoose";
import { IStudent } from "../interfaces/student";
import Student, { StudentDocument } from "../models/student";

export default class StudentsController {
    constructor() {}

    public async getStudentsData(): Promise<StudentDocument[]> {
        return await Student.find({})
                            .sort({mark: -1, firstName: 1, lastName: 1})
                            .limit(2)
                            .select({firstName: true});
    }

    public async findStudentByFn(fn: number): Promise<StudentDocument[]> {
        return await Student.find({ fn });
    }

    public async addStudent(student: IStudent): Promise<StudentDocument> {
        const newStudent: StudentDocument = new Student({
            _id: new mongoose.Types.ObjectId(),
            ...student
        });

        return await newStudent.save();
    }

    public async updateStudentData(fn: number, studentData: IStudent): Promise<boolean> {
        const res = await Student.updateOne(
            { fn },
            { ...studentData }
        );

        return res.acknowledged;
    }

    public async deleteStudentData(fn: number): Promise<number> {
        const res = await Student.deleteOne({ fn });
        
        return res.deletedCount;
    }
}