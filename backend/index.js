const http = require("http");
const https = require("https");
const fs = require("fs");
const host = "localhost";
const port = 8080;

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const headers = {
	headers: {
		"User-Agent": "Mozilla/5.0",
		"Accept-Encoding": "gzip, br"
	}
}

const requestListener = function(req, res) {
    const url = new URL(`http://${req.host ?? "localhost"}${req.url}`);
    const urlParam = url.searchParams.get('url');
    console.log(urlParam);
    try {
        const pUrl = new URL(urlParam);
        let protocol = http;
        console.log(pUrl.protocol);
        if (pUrl.protocol == "https:") protocol = https;
        protocol.get(pUrl, (pRes) => {
			res.writeHead(pRes.statusCode,pRes.headers);
			res.pipe(pRes);
        });
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end("ouch");
    }
}

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

const server = https.createServer(options, requestListener);
server.listen(port,host,() => {
    console.log("Server running");
});
