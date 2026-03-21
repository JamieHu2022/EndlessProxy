const http = require("http");
const https = require("https");
const zlib = require("zlib");
const fs = require("fs");

const host = "localhost";
const port = 8080;

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const headers = {
    headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Encoding": "gzip, br"
    }
};

const requestListener = function(req, res) {

	// grab url, find link to proxy
	const url = new URL(`http://${req.headers.host}${req.url}`);
    const urlParam = url.searchParams.get('url');
	// no url param = error
	if (!urlParam) {
		res.writeHead(400);
		return res.end("Missing url param (?url=)");
	}

    try {
		const pUrl = new URL(urlParam);
        let protocol = http;

        if (pUrl.protocol === "https:") protocol = https;

        protocol.get(pUrl, headers, (pRes) => {
			const contentType = pRes.headers["content-type"] || "";
			const contentEncoding = pRes.headers["content-encoding"] || "";
			if (contentType.includes("text/html")) {
				let chunks = [];
				pRes.on("data", (chunk) => {
					chunks.push(chunk);
				});

				pRes.on("end", () => {

					let data = Buffer.concat(chunks);
					
					function callback(dataDecoded) {
						const rewritten = rewriteHTML(dataDecoded.toString('utf-8'), urlParam, `${res.protocol}//${host}:${port}`);
						res.writeHead(pRes.statusCode, {"Content-Type": "text/html"});
						res.end(rewritten);
						return;
					}
					
					if (contentEncoding === "") {
						callback(data);
					}
					if (contentEncoding === "gzip") {
						let decoded = zlib.unzip(data, (err,buffer) => {
							if (!err) {
								callback(buffer);
							} else {
								console.log("[gzip] " + err);
							}
						});
					}
					return;
				});
			} else {
				res.writeHead(pRes.statusCode, pRes.headers);
				pRes.pipe(res);
				return;
			}
        }).on("error", (err) => {
			res.writeHead(500);
			res.end("Proxy error!");
			return;
		});

    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end("ouch");
		return;
    }
};

function rewriteHTML(html, originUrl, hostUrl) {
	html = html.replace(/(href|src|action)="(\/[^"]+)"/g,
		(_,attr,path) => `${attr}="${hostUrl}/?url=${encodeURIComponent(originUrl+path)}`);

	const script = `<script>
	(function(){
	const PROXY = "${hostUrl}/?url=";
	
	function px(u) {
	try {
	return PROXY + encodeURIComponent(new URL(u,location.href));
	} catch {return u;}
	}

	// fix links
	document.addEventListener("click", e => {
	const a = e.target.closest("a");
	if (a && a.href && !a.href.includes("?url=")) {
	e.preventDefault();
	location.href = px(a.getAttribute("href"));
	}
	}, true);

	// fix forms
	document.addEventListener("submit", e => {
	const f = e.target;
	if (f.action) {
	e.preventDefault();
	const params = new URLSearchParams(new FormData(f)).toString();
	location.href = px(f.action) + "?" + params;
	}
	}, true);

	// fix js fetch
	const ofetch = window.fetch;
	window.fetch = function(u, o) {
	try {
	return ofetch(px(u), o);
	} catch {
	return ofetch(u, o);
	}
	};

	// xhr
	const open = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function(m, u) {
	arguments[1] = px(u);
	return open.apply(this, arguments);
	};
	})();
	<\/script>`;
	return html.replace("</head>", script + "</head>");
}

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
