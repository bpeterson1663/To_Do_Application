var express = require('express');
var app = express();
var index = require('./routes/index');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use("/", index);

app.set("port", process.env.PORT || 3000);

app.listen((app.get("port")), function(){
  console.log("Listening on Port :3000");
});
