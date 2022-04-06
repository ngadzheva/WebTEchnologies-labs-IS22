const express = require('express');
const { read, write } = require('../utils/file-utils');

const filePath = './resources/students.json';

const students = express.Router();

students.get('/', (req, res) => {
   read(filePath)
    .then(students => res.status(200).json(JSON.parse(students)))
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
});

students.post('/', async (req, res) => {
    const { body } = req;

    read(filePath)
        .then(students => JSON.parse(students))
        .then(studentsData => {
            studentsData.students.push(body);
            return studentsData;
        })
        .then(newStudents => {
            console.log(newStudents);
            write(filePath, newStudents);
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

module.exports = { students };

// http://localhost:3001/students/