import { IStudent, IStudentsData } from "../interfaces/student";
import { readFile, writeFile } from "../utils/file-utils";

const filePath: string = './resources/students.json';

export default class StudentsController {
    private studentsData: IStudentsData | undefined;

    constructor() {
        this.readStudentsData()
            .then((result: string) => this.studentsData = JSON.parse(result));
    }

    private async readStudentsData(): Promise<string> {
        return await readFile(filePath);
    }

    public getStudentsData(): IStudentsData | undefined {
        return this.studentsData;
    }

    public findStudentByFn(fn: number): IStudent[] {
        return this.studentsData ? this.studentsData.students.filter((student: IStudent) => student.fn === fn) : [];
    }

    public addStudent(student: IStudent): void {
        this.studentsData && this.studentsData.students.push(student);
    }

    public async writeStudentsData(): Promise<void> {
        await writeFile(filePath, JSON.stringify(this.studentsData));
    }

    public updateStudentData(fn: number, studentData: IStudent): void {
        const students = this.studentsData ? this.studentsData.students.map((currentStudent) => {
            if (currentStudent.fn === fn) {

                // currentStudent -> {"firstName":"Maria","lastName":"Georgieva","fn":77777,"mark":6}
                // studentData -> {fn: 77777, mark: 5}
                // {"firstName":"Maria","lastName":"Georgieva","fn":77777,"mark":5}
                currentStudent = {
                    ...currentStudent,
                    ...studentData
                };
            }

            return currentStudent;
        }) : [];

        (students && this.studentsData) && (this.studentsData.students = students);
    }

    public deleteStudentData(fn: number): void {
        const students = this.studentsData ? this.studentsData.students.filter(student => student.fn !== fn) : [];

        (students && this.studentsData) && (this.studentsData.students = students);
    }
}