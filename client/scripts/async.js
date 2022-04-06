// for(var i = 0; i < 5; ++i) {
//     setTimeout(() => console.log(i), 1000);
// }

// for(let i = 0; i < 5; ++i) {
//     setTimeout(() => console.log(i), 1000);
// }

const fs = require('fs');

const changeFn = student => student.replace(/00/g, '12');

let result = '';

// fs.readFile('./resources/students.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.error('Failed reading file: ', err.message);
//         return;
//     }

//     result = data.toString();

//     console.log('File read.');

//     result = changeFn(result);

//     console.log('Data changed.');

//     fs.writeFile('./resources/editedStudents.txt', result, 'utf-8', (err) => {
//         if (err) {
//             console.error('Failed writing file: ', err.message);
//             return;
//         }

//         console.log('File written.');

//         fs.readFile('./resources/editedStudents.txt', 'utf-8', (err, data) => {
//             if (err) {
//                 console.error('Failed reading file: ', err.message);
//                 return;
//             }

//             console.log(data.toString());

//             console.log('Edited file read.');
//         });

//         console.log('DONE');
//     });
// });

const read = (filepath, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, encoding, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            console.log('Reading file done');
            resolve(data);
        });
    });
};

const write = (filepath, data, encoding) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, data, encoding, (err) => {
            if (err) {
                reject(err);
                return;
            }

            console.log('Writing file done');
            resolve();
        });
    });
};

read('./resources/students.txt', 'utf-8')
    .then(data => changeFn(data.toString()))
    .then(changedData => write('./resources/promisedEditedStudents.txt', changedData, 'utf-8'))
    .then(() => console.log('DONE'))
    .catch(err => console.error(err.message));