var request = require('request');

module.exports = function(RED) {
    function setLCDText(config) {
        RED.nodes.createNode(this,config);
        var context = this.context();
        var node = this;
        this.on('input', function(msg) {

        var ln1 = "";
        var ln2 = "";
        var ln3 = "";
        var ln4 = "";

        if (msg.hasOwnProperty('payload')) {
          if (config.ln1fix != "") {
            ln1 = config.ln1fix;
          } else if (msg.payload.hasOwnProperty('ln1')) {
            ln1 = msg.payload.ln1;
          }

          if (config.ln2fix != "") {
            ln2 = config.ln2fix;
          } else if (msg.payload.hasOwnProperty('ln2')) {
            ln2 = msg.payload.ln2;
          }

          if (config.ln3fix != "") {
            ln3 = config.ln3fix;
          } else if (msg.payload.hasOwnProperty('ln3')) {
            ln3 = msg.payload.ln3;
          }

          if (config.ln4fix != "") {
            ln4 = config.ln4fix;
          } else if (msg.payload.hasOwnProperty('ln4')) {
            ln4 = msg.payload.ln4;
          }
        }

        request.post({
          url:     config.url,
          form:    {
                     ln1: ln1,
                     ln2: ln2,
                     ln3: ln3,
                     ln4: ln4,
                    }
        }, function(error, response, body){
          
        });



        });
    }
    RED.nodes.registerType("set LCD Text",setLCDText);
};
