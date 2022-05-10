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

students.use(getStudentsController);

students.get('/', auth, async (req: Request, res: Response) => {
    const students = await studentsController.getStudentsData();

    if (students) {
        res.status(200).json(students);
    } else {
        res.status(404).json({ error: 'No students found' });
    }
});

students.get('/:fn', auth, async (req: Request, res: Response) => {
    const { fn } = req.params;
    // { fn: 77777, name: value }
    // const asdf: { [key: string]: number | string };

    const student = await studentsController.findStudentByFn(Number(fn));

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

    try {
        await studentsController.addStudent(student);

        res.status(200).json('Student added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'})
    }
});

students.put('/:fn', auth, async (req: Request, res: Response) => {
    const student: IStudent = req.body;
    const { fn } = req.params;

    try {
        await studentsController.updateStudentData(Number(fn), student);

        res.status(200).json('Student updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'})
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

    try {
        await studentsController.updateStudentData(Number(fn), student as IStudent);

        res.status(200).json('Student mark updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'})
    }
});

students.delete('/:fn', auth, async (req: Request, res: Response) => {
    const { fn } = req.params;

    try {
        await studentsController.deleteStudentData(Number(fn));

        res.status(200).json('Student deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'})
    }
});

export default students;

// http://localhost:3001/students/
// http://localhost:3001/students/77777
// http://localhost:3001/students/77777/marks