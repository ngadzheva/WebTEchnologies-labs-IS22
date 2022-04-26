const sendRequest = (url, options, successCallback, errorCallback) => {
    fetch(url, options)
        .then(data => data.json())
        .then(parsedData => successCallback(parsedData))
        .catch(error => errorCallback(error))
};
