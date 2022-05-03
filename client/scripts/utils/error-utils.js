const handleError = error => console.error(error);

const redirect = error => {
    console.error(error);
    window.location = 'login.html';
};
