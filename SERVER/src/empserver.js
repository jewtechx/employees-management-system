const http = require('http');

const PORT = 4000;

const app = require('./app');

const server = http.createServer(app);

server.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}`)
})

