const http = require("http");
const host = "localhost";
const port = 8080;

const requestListener = function(req, res) {
    res.writeHead(200);
    res.end("hello world");
}

const server = http.createServer(requestListener);
server.listen(port,host,() => {
    console.log("Server running");
});
