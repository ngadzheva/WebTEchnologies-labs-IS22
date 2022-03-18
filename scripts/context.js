// number string undefined array object NaN

// const array = [1, 'string', undefined, function() { console.log('Hello'); }];
// array.push(5);
// array.shift(6);

// const object = { 
//     prop: 1,
//     prop2: function() {},
//     prop3: {
//         innerProp: 'value'
//     }
// }

// object['prop']
// object.prop2

name = 'Super Global';
const ivan = { name: 'ivan', age: 22 };
const pesho = { name: 'pesho', age: 23 };
const gosho = { name: 'gosho', age: 22 };

function greeting(a, b, c) { 
    console.log(`Hello, ${this.name}!`);
}

// greeting();

ivan.greeting = greeting;
ivan.greeting();

greeting.call(pesho, 5, 6, 7);
ivan.greeting.apply(gosho, [5, 6, 7]);

const arrow = () => console.log('Arrow example');

const arrowGreeting = () => console.log(`Hello, ${this.name}, from arrow!`);
arrowGreeting();
arrowGreeting.call(ivan);