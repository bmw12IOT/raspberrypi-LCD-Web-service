var request = require('request');

request.post({
  url:     'http://donatopi:8080',
  form:    {
             ln1: "he1ydude",
             ln2: "hey2dude",
             ln3: "heyd3ude",
             ln4: "heydu4de",
            }
}, function(error, response, body){
  console.log(body);
});
