require('./server.babel'); // babel registration (runtime transpilation for node)
var express = require('express');
var app = express();
var path = require('path');
var proxyMiddleWare = require("http-proxy-middleware");
// var https = require('https');
const {PORT, APIHOST, APIPORT} = process.env;
var proxyPath = `http://${APIHOST}:${APIPORT}`;// 后端服务地址
var proxyOption = {
  target: proxyPath,
  pathRewrite: {
    '^/api': ''
  }
};
// const server = new https.Server(credentials, app);
app.listen(PORT || 8000, function () {
  var host = app.address().address;
  var port = app.address().port;
  console.log('UHS-ADMIN app listening at http://%s:%s', host, port);
});

app.use(express.static(path.join(__dirname, 'dist')));

// 代理接口
app.use('/api', proxyMiddleWare(proxyOption));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

