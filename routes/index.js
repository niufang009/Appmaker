var app_config = require('../config/app.json');
var server_config = require('../config/server.json');

// if(process.argv[2] === '--dev'){
//     app_config.livereload = '<script src="http\:\/\/localhost\:35728\/livereload.js?snipver=1"><\/script>';
// }else{
//     app_config.livereload ='';
// }
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index',app_config);
    });

    app.get(/^(\/website\/(\w+)(\/)?)?$/, function (req, res) {
        // console.log(req.params)
        res.render(req.params[1], app_config);
    });

    // app.get(/^\/(\w+)(\/)?(\/apps\/(\w+)(\/)?)?$/, function (req, res) {
    //     res.render(server_config['views_prefix'] + req.params[0], app_config);
    // });
    
};