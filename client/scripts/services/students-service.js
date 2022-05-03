const getStudentsData = () => {
    const url = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}${serverConfig.routes.students}`;
    const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    sendRequest(url, options, showStudents, redirect);
};

const sendStudentData = studentData => {
    const url = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}${serverConfig.routes.students}`;
    const options = { 
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    };

    sendRequest(url, options, handleStudentMessage, handleError);
};

const deleteStudentData = studentFn => {
    const url = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}${serverConfig.routes.students}/${studentFn}`;
    const options = { 
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    sendRequest(url, options, handleStudentMessage, handleError);
}