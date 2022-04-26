import { Router, Request, Response } from 'express'; 
import { read, write } from '../utils/file-utils';

const filePath: string = './resources/students.json';

const students: Router = Router();

interface Student {
    firstName: string;
    lastName: string;
    fn: number;
    mark: number;
};

interface StudentsData {
    students: Array<Student>;
}

students.get('/', (req: Request, res: Response) => {
   read(filePath)
    .then(students => res.status(200).json(JSON.parse(students)))
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
});

students.get('/:fn', (req: Request, res: Response) => {
    const { fn } = req.params;
    // { fn: 77777, name: value }
    // const asdf: { [key: string]: number | string };

    read(filePath)
        .then(students => JSON.parse(students))
        .then(studentsData => studentsData.students.filter((student: Student) => student.fn === Number(fn)))
        .then((student: Student[]) => res.status(200).json(student[0]))
        .catch(error => res.status(500).json({ error: 'Internal server error' }));
})

students.post('/', async (req: Request, res: Response) => {
    // {
    //     firstName: ...,
    //     lastName: ...,
    //     fn: ....,
    //     mark: ...
    //     age: ...
    // }
    const student: Student = req.body;

    read(filePath)
        .then(students => JSON.parse(students))
        .then((studentsData: StudentsData) => {
            studentsData.students.push(student);
            return studentsData;
        })
        .then(newStudents => {
            console.log(newStudents);
            write(filePath, JSON.stringify(newStudents));
        })
        .then(() => res.status(200).json('Student added successfully'))
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'Internal server error'})
        });

    // try {
    //     const studentsData = await read(filePath);
    //     // const studentsData = JSON.parse(students);
    //     const newStudents = studentsData.students.push(body);
    //     await write(filePath, newStudents);
    //     res.status(200).json(newStudents);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ error: 'Internal server error'})
    // }
});

students.put('/:fn', (req: Request, res: Response) => {
    const student: Student = req.body;
    const { fn } = req.params;

    read(filePath)
        .then(students => JSON.parse(students))
        .then((studentsData: StudentsData) => {
            const students = studentsData.students.map((currentStudent) => {
                if (currentStudent.fn === Number(fn)) {
                    currentStudent = student;
                }

                return student;
            });

            return students;
        })
        .then(updatedStudents => {
            console.log(updatedStudents);
            write(filePath, JSON.stringify({students: updatedStudents}));
        })
        .then(() => res.status(200).json('Student updated successfully'))
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'Internal server error'})
        });
});

students.patch('/:fn/marks', (req: Request, res: Response) => {
    // body -> {mark: 5}
    const { mark } = req.body;
    const { fn } = req.params;

    read(filePath)
        .then(students => JSON.parse(students))
        .then((studentsData: StudentsData) => {
            const students = studentsData.students.map((student) => {
                if (student.fn === Number(fn)) {
                    student.mark = mark;
                }

                return student;
            });

            return students;
        })
        .then(updatedStudents => {
            console.log(updatedStudents);
            write(filePath, JSON.stringify({students: updatedStudents}));
        })
        .then(() => res.status(200).json('Student mark updated successfully'))
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'Internal server error'})
        });
});

students.delete('/:fn', (req: Request, res: Response) => {
    const { fn } = req.params;

    read(filePath)
        .then(students => JSON.parse(students))
        .then((studentsData: StudentsData) => {
            return studentsData.students.filter(student => student.fn !== Number(fn));
        })
        .then(updatedStudents => {
            console.log(updatedStudents);
            write(filePath, JSON.stringify({students: updatedStudents}));
        })
        .then(() => res.status(200).json('Student deleted successfully'))
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'Internal server error'})
        });
});

export default students;

// http://localhost:3001/students/
// http://localhost:3001/students/77777
// http://localhost:3001/students/77777/marks