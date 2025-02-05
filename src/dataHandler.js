const xml2js = require('xml2js');
const jsonData = require('./data.json');

const builder = new xml2js.Builder();

function get404(req, res) {
  if (req.headers.accept === 'text/xml') {
    res.writeHead(404, { 'Content-Type': 'text/xml' });
    const xml = builder.buildObject(jsonData.notFound['404']);
    res.write(xml);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(jsonData.notFound['404']));
    res.end();
  }
}

function getResponse(req, res, status, code) {
  if (req.headers.accept === 'text/xml') {
    res.writeHead(Number(code), { 'Content-Type': 'text/xml' });
    const xml = builder.buildObject(jsonData[status][code]);
    res.write(xml);
    res.end();
  } else {
    res.writeHead(Number(code), { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(jsonData[status][code]));
    res.end();
  }
}

module.exports = {
  get404,
  getResponse,
};
