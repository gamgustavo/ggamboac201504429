var express = require("express");
var app = express();
var router = express.Router();

var path = __dirname + '/src/';

// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});


app.use(express.static(path));
app.use("/", router);

app.listen(5000, function () {
  console.log('Devops Demo')
})