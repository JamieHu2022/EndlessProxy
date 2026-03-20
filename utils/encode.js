function encode(u) { return Buffer.from(u).toString('base64'); }
function decode(u) { return Buffer.from(u, 'base64').toString(); }

module.exports = { encode, decode };
