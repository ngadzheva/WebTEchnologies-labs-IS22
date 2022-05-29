import { model, Schema, Document, Model } from "mongoose";
import { IStudent } from "../interfaces/student";

export interface StudentDocument extends IStudent, Document {

}

export interface StudentModel extends Model<StudentDocument> {

}

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        maxLength: [20, 'First name must be less than 20 symbols']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        maxLength: [30, 'Last name must be less than 30 symbols']
    },
    fn: {
        type: Number,
        required: [true, 'Faculty number is required'],
        min: [70000, 'Faculty number must be greater than or equal to 70000'],
        max: [79999, 'Faculty number must be less than or equal to 79999']
    },
    mark: {
        type: Number,
        required: false,
        min: [2, 'Mark must be greater than or equal than 2'],
        max: [6, 'Mark must be less than or equal than 6'],
    }
});

const Student = model('Student', studentSchema);

export default Student;
