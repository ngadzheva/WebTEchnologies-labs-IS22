import { Router, Request, Response } from 'express';
import StudentsController from '../controllers/students-controller';
import { IStudent } from '../interfaces/student';
import auth from '../middlewares/auth';

const students: Router = Router();

let studentsController: StudentsController;

const getStudentsController = (req: Request, res: Response, next: () => void) => {
    try {
        studentsController = new StudentsController();

        next();
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const saveStudentData = async (res: Response, message: string): Promise<void> => {
    try {
        await studentsController.writeStudentsData();

        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'})
    }
}

students.use(getStudentsController);

students.get('/', auth, (req: Request, res: Response) => {
    const students = studentsController.getStudentsData();

    if (students) {
        res.status(200).json(students);
    } else {
        res.status(404).json({ error: 'No students found' });
    }
});

students.get('/:fn', auth, (req: Request, res: Response) => {
    const { fn } = req.params;
    // { fn: 77777, name: value }
    // const asdf: { [key: string]: number | string };

    const student = studentsController.findStudentByFn(Number(fn));

    if (student) {
        res.status(200).json(student[0]);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
})

students.post('/', auth, async (req: Request, res: Response) => {
    // {
    //     firstName: ...,
    //     lastName: ...,
    //     fn: ....,
    //     mark: ...
    //     age: ...
    // }
    const student: IStudent = req.body;

    studentsController.addStudent(student);

    saveStudentData(res, 'Student added successfully');
});

students.put('/:fn', auth, async (req: Request, res: Response) => {
    const student: IStudent = req.body;
    const { fn } = req.params;

    studentsController.updateStudentData(Number(fn), student);

    saveStudentData(res, 'Student updated successfully');
});

students.patch('/:fn/marks', auth, async (req: Request, res: Response) => {
    // body -> {mark: 5}
    const { mark } = req.body;
    const { fn } = req.params;

    const student: unknown = {
        fn,
        mark
    };

    studentsController.updateStudentData(Number(fn), student as IStudent);

    saveStudentData(res, 'Student mark updated successfully');
});

students.delete('/:fn', auth, async (req: Request, res: Response) => {
    const { fn } = req.params;

    studentsController.deleteStudentData(Number(fn));

    saveStudentData(res, 'Student deleted successfully');
});

export default students;

// http://localhost:3001/students/
// http://localhost:3001/students/77777
// http://localhost:3001/students/77777/marks