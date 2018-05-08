var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();


const PORT = process.env.PORT || 2121;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(express.static(__dirname + '/app/public'));

// req routes
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);


app.listen(PORT, function(){
    console.log("listening on PORT " + PORT);
});