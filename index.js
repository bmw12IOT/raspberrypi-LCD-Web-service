var http = require('http');
var url  = require('url');
const lcd = require('lcd');

var app = http.createServer(function(req,res){
  if(req.method == 'GET') {
    var valid = false;
    var query = url.parse(req.url, true).query;

    if (query.hasOwnProperty('msg') {
      valid = true;
      lcd.setLCDMesage(query.msg);
    }

    res.setHeader('Content-Type', 'application/json');
    res.writeHead( 200 );
    res.end(JSON.stringify({ valid: valid }, null, 3));
  }
});
app.listen(3000);
