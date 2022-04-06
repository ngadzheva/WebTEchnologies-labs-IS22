const student = {
    name: 'Student',
    age: 22,
    fn: 777777
};

const numbers = [1, 2, 3, 4, 5 ,6];

// const name = student.name;
// const age = student.age;
// const fn = student.fn;

const { name, age, fn, mark } = student;

const a = 5;
const b = 4;

const temp = a;
a = b;
b = temp;

[ b, a ] = [a, b];

const [ , , third, , fifth] = numbers;

const person = { 
    name: 'Name',
    age: 22
};

const lecturer = { 
    ...person,
    subject: 'Subject'
};

const nums = [0, ...numbers, 7, 8, 9];

function sum (a, b, c) {
    return a + b + c;
}

const arr = [5, 9, 6];

sum(...arr);