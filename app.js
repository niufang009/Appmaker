var express = require('express');
// var compression = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var app = module.exports = express();
var router = express.Router();

var server_config = require('./config/server.json');
var routes = require('./routes');
var environmentDb =  process.argv[2];
var isDev;
environmentDb = environmentDb ?environmentDb: "dev";
isDev = /dev/i.test(environmentDb);
// Register ejs as .html.
app.engine('.html', require('ejs').__express);
//app.use(logger());
console.log(isDev);
if(isDev){
    app.set('views', path.join(__dirname + '/views'));
}else{
    app.set('views', path.join(__dirname + '/public/website'));
}
app.set('view engine', 'html');

// app.use(compression());
app.use(bodyParser.json());
if(isDev){
    app.use(express.static(__dirname + '/src'));
}else{
    app.use(express.static(__dirname + '/public/website'));
}

routes(app);

var port = server_config['port'] || 4000;

if (!module.parent) {
    app.listen(port);
    console.log('Express started on port ' + port);
}
