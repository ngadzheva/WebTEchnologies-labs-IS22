function Person(name, age) {
    this.name = name;
    this.age = age;

    this.greeting = () => console.log(`Hello, ${this.name}!`);
}

const ivan = new Person('Ivan', 22);
ivan.name
ivan.age
ivan.greeting();

const pesho = new Person('Pesho', 23);
pesho.greeting();

Person.prototype.personInfo = function() { console.log(`${this.name}: ${this.age}`); }

const gosho = new Person('Gosho', 22);
gosho.personInfo();
gosho.personInfo = function() { console.log(this.name)}
gosho.personInfo();

const maria = new Person('Maria', 22);
maria.personInfo();

module.exports = function(name, age) {
    this.name = name;
    this.age = age;

    this.greeting = () => console.log(`Hello, ${this.name}!`);
};
