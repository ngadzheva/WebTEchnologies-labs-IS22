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

// const saveStudentData = async (res: Response, message: string): Promise<void> => {
//     try {
//         await studentsController.writeStudentsData();

//         res.status(200).json(message);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error'})
//     }
// }

students.use(getStudentsController);

students.get('/', auth, async (req: Request, res: Response) => {
    try {
        const students = await studentsController.getStudentsData();

        if (students) {
            res.status(200).json(students);
        } else {
            res.status(404).json({ error: 'No students found' });
        }
    } catch(error) {
        console.error(error);

        res.status(500).json({ error: "Internal server error" });
    }
});

students.get('/:fn', auth, async (req: Request, res: Response) => {
    const { fn } = req.params;
    // { fn: 77777, name: value }
    // const asdf: { [key: string]: number | string };

    try {
        const student = await studentsController.findStudentByFn(Number(fn));

        if (student) {
            res.status(200).json(student[0]);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch(error) {
        console.error(error);

        res.status(500).json({ error: "Internal server error" });
    }
})

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

    res.status(201).json({ message: 'Student added successfully', addedStudent});
}));

students.put('/:fn', auth, async (req: Request, res: Response) => {
    const student: IStudent = req.body;
    const { fn } = req.params;

    const updatedStudent = await studentsController.updateStudentData(Number(fn), student);

    res.status(200).json({ message: 'Student updated successfully', updatedStudent});
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

    res.status(200).json({ message: 'Student mark updated successfully', updatedStudent});
});

students.delete('/:fn', auth, async (req: Request, res: Response) => {
    const { fn } = req.params;

    const deletedStudent = await studentsController.deleteStudentData(Number(fn));
    res.status(200).json({ message: 'Student deleted successfully', deletedStudent});
});

export default students;

// http://localhost:3001/students/
// http://localhost:3001/students/77777
// http://localhost:3001/students/77777/marks