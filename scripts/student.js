const Person = require('./person');

Person.prototype.personInfo = function() { console.log(`${this.name}: ${this.age}`); }

function Student(name, age, fn) {
    Person.call(this, name, age);

    this.fn = fn;

    let _mark;

    this.getMark = () => _mark;
    this.setMark = mark => _mark = mark;
}

Student.prototype = Object.create(Person.prototype);

const student = new Student('Student', 22, 88888);

Student.prototype.studentInfo = function() {
    this.personInfo();
    console.log(`, ${this.fn}`);
}

student.personInfo();
student.setMark(6);
console.log(student.getMark());
student.studentInfo();

const person = new Person('Person', 22);
person.studentInfo();
