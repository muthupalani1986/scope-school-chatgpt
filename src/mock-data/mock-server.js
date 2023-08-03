var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('src/mock-data/db.json')
var middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)
server.use(function (req, res, next) {
  if (req.method === 'POST') {
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request
    req.method = 'GET'
    req.query = req.body
  }
  // Continue to JSON Server router
  next()
});
server.use(router);
server.listen(3000, function () {
  console.log('JSON Server is running')
})
