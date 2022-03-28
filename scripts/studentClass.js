import Person from './personClass';

class Student extends Person {
    constructor(name, age, fn) {
        super(name, age);

        this.fn = fn;

        let _mark;

        this.getMark = () => _mark;
        this.setMark = mark => _mark = mark;
    }

    studentInfo() { 
        super.personInfo();
        console.log(`, ${this.fn}`);
    }
}