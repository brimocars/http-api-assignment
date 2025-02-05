const http = require('http');
const clientHandler = require('./clientHandler.js');
const dataHandler = require('./dataHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
  console.log(req.url);
  const [baseUrl, query] = req.url.split('?');

  switch (baseUrl) {
    case '/':
      clientHandler.getIndex(req, res);
      break;
    case '/style.css':
      clientHandler.getStyle(req, res);
      break;
    case '/success':
      dataHandler.getResponse(req, res, 'success', '200');
      break;
    case '/badRequest':
      if (query === 'valid=true') {
        dataHandler.getResponse(req, res, 'badRequest', '200');
      } else {
        dataHandler.getResponse(req, res, 'badRequest', '400');
      }
      break;
    case '/unauthorized':
      if (query === 'loggedIn=yes') {
        dataHandler.getResponse(req, res, 'unauthorized', '200');
      } else {
        dataHandler.getResponse(req, res, 'unauthorized', '401');
      }
      break;
    case '/forbidden':
      dataHandler.getResponse(req, res, 'forbidden', 403);
      break;
    case '/internal':
      dataHandler.getResponse(req, res, 'internal', 500);
      break;
    case '/notImplemented':
      dataHandler.getResponse(req, res, 'notImplemented', 501);
      break;
    default:
      dataHandler.get404(req, res);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
