(function() {
    const headers = document.getElementsByTagName('header');
    console.log(headers);
    const firstName = document.getElementById('first-name');
    console.log(firstName);
    const studentInfo = document.getElementsByClassName('student');
    console.log(studentInfo);
    const headerRow = document.querySelector('#header-row');
    console.log(headerRow);
    const students = document.querySelectorAll('.student');
    console.log(students);

    headers[0].innerHTML += ' Marks';

    const th = document.createElement('th');
    const text = document.createTextNode('Mark');
    th.append(text);

    const deleteHeader = document.getElementById('delete-header');
    deleteHeader.before(th);

    const td = document.createElement('td');
    td.innerHTML = 6;

    const deleteBtn = document.getElementById('delete');
    deleteBtn.before(td);

    deleteBtn.addEventListener('click', deleteStudent);

    const addStudentBtn = document.getElementById('submit');
    addStudentBtn.addEventListener('click', addStudent);

    getStudentsData();
})();

// function example() {
//     var a = 5;
//     const e = 7;

//     for (var i = 0; i < 10; ++i) {
//         var c = a + 1;
//         let d = a + 1;
//     }

//     ++c; // valid
//     ++d; // error
//     ++e; // error
// }
  
// ++a; // error