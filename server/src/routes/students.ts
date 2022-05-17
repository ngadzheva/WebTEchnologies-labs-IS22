import { Router, Request, Response } from 'express';
import StudentsController from '../controllers/students-controller';
import { IStudent } from '../interfaces/student';
import auth from '../middlewares/auth';
import errorHandler from '../middlewares/error-handler';

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

students.use(getStudentsController);

students.get('/', auth, errorHandler(async (req: Request, res: Response) => {
    const students = await studentsController.getStudentsData();

    if (students.length > 0) {
        res.status(200).json(students);
    } else {
        res.status(404).json({ error: 'No students found' });
    }
}));

students.get('/:fn', auth, errorHandler(async (req: Request, res: Response) => {
    const { fn } = req.params;

    const student = await studentsController.findStudentByFn(Number(fn));

    if (student.length > 0) {
        res.status(200).json(student[0]);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
}));

students.post('/', auth, errorHandler(async (req: Request, res: Response) => {
    // {
    //     firstName: ...,
    //     lastName: ...,
    //     fn: ....,
    //     mark: ...
    //     age: ...
    // }
    const student: IStudent = req.body;

    const addedStudent = await studentsController.addStudent(student);

    if (addedStudent) {
        res.status(201).json({ message: 'Student added successfully', addedStudent});
    } else {
        res.status(500).json({ error: 'Student not added' });
    }
}));

students.put('/:fn', auth, async (req: Request, res: Response) => {
    const student: IStudent = req.body;
    const { fn } = req.params;

    const updatedStudent = await studentsController.updateStudentData(Number(fn), student);

    if (updatedStudent) {
        res.status(200).json({ message: 'Student updated successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

students.patch('/:fn/marks', auth, async (req: Request, res: Response) => {
    // body -> {mark: 5}
    const { mark } = req.body;
    const { fn } = req.params;

    const student: unknown = {
        fn,
        mark
    };

    const updatedStudent = await studentsController.updateStudentData(Number(fn), student as IStudent);

    if (updatedStudent) {
        res.status(200).json({ message: 'Student mark updated successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

students.delete('/:fn', auth, async (req: Request, res: Response) => {
    const { fn } = req.params;

    const deletedStudent = await studentsController.deleteStudentData(Number(fn));
    
    if (deletedStudent != 1) {
        res.status(200).json({ message: 'Student deleted successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

export default students;

// http://localhost:3001/students/
// http://localhost:3001/students/77777
// http://localhost:3001/students/77777/marks