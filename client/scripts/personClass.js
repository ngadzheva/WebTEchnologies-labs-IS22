export default class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() { 
        console.log(`Hello, ${this.name}!`);
    }

    personInfo() { 
        console.log(`${this.name}: ${this.age}`);
    }
}

// const person = new Person('Person name', 22);

