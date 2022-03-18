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

    deleteBtn.addEventListener('click', function(event) {
        const studentToDelete = event.target.parentNode.parentNode;
        studentToDelete.parentNode.removeChild(studentToDelete);
    });

    const addStudentBtn = document.getElementById('submit');
    addStudentBtn.addEventListener('click', addStudent);
})();

function addStudent(event) {
    event.preventDefault();
    
    const firstName = document.getElementsByName('first-name')[0];
    const lastName = document.getElementsByName('last-name')[0];
    const fn = document.getElementsByName('fn')[0];
    const mark = document.getElementsByName('mark')[0];

    const studentData = {
        firstName: firstName.value,
        lastName: lastName.value,
        fn: fn.value,
        mark: mark.value
    };

    appendStudentTable(studentData);

    firstName.value = '';
    lastName.value = '';
    fn.value = '';
    mark.value = '';
}

function appendStudentTable(data) {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'student');

    const firstNameTd = document.createElement('td');
    firstNameTd.innerHTML = data.firstName;

    const lastNameTd = document.createElement('td');
    lastNameTd.innerHTML = data.lastName;

    const fnTd = document.createElement('td');
    fnTd.innerHTML = data.fn;

    const markTd = document.createElement('td');
    markTd.innerHTML = data.mark;

    const deleteTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteTd.append(deleteBtn);

    tr.append(firstNameTd, lastNameTd, fnTd, markTd, deleteTd);

    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.append(tr);
}

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