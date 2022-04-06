const { createServer } = require('http');

const server = createServer('/students', (req, res) => {
    console.log(req.url);
    console.log(req.headers);
    console.log(req.method);

    let data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
    });

    req.on('end', () => {
        console.log('Data received');
        console.log(data);
    });

    res.writeHead(200);
    res.end('Hello, world!');
});

server.listen(3001);
console.log('Server is listening on port 3001');