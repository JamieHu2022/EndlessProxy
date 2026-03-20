const http = require("http");
const https = require("https");
const fs = require("fs");

const host = "localhost";
const port = 8080;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const headers = {
    headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Encoding": "gzip, br"
    }
};

const requestListener = function(req, res) {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const urlParam = url.searchParams.get('url');

    console.log(urlParam);

    try {
        const pUrl = new URL(urlParam);
        let protocol = http;

        if (pUrl.protocol === "https:") protocol = https;

        protocol.get(pUrl, headers, (pRes) => {
            res.writeHead(pRes.statusCode, pRes.headers);
            pRes.pipe(res);
        });

    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end("ouch");
    }
};

/* https
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};
 */

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log("Server running");
});
