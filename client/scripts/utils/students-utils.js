const showStudents = studentsData => {
    studentsData.students.forEach(student => {
        appendStudentTable(student);
    });
};

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

    sendStudentData(studentData);
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
    deleteBtn.addEventListener('click', deleteStudent);
    deleteTd.append(deleteBtn);

    tr.append(firstNameTd, lastNameTd, fnTd, markTd, deleteTd);

    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.append(tr);
}

const handleStudentMessage = result => {
    const message = document.getElementById('message');
    message.innerHTML = result.message;
    message.style.display = 'block';
    message.style.color = 'green';
};

function deleteStudent(event) {
    const student = event.target;

    const studentFn = student.parentNode.previousElementSibling.previousElementSibling.innerHTML;
    deleteStudentData(studentFn);

    const studentToDelete = student.parentNode.parentNode;
    studentToDelete.parentNode.removeChild(studentToDelete);
}