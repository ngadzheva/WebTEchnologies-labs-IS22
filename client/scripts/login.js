const login = event => {
    event.preventDefault();

    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    const user = {
        userName,
        password,
        rememberMe
    };

    const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const url = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/${serverConfig.routes.login}`;

    sendRequest(url, options, loginUser, displayError);
};

const loginUser = (data) => {
    console.log('Logged in')
    window.location = 'students-marks.html';
}

const displayError = error => {
    const errors = document.getElementById('errors');
    errors.innerHTML = error.error;
    errors.style.display = 'block';
    errors.style.color = 'red';
}

(function() {
    const loginBtn = document.getElementById('login');

    loginBtn.addEventListener('click', login);
})(); 
