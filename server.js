const http = require('http');
const app = require('./app')
const hostname = "127.0.0.1" || "localhost";
const port = 8080;

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}`);
});
