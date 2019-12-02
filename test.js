const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


var mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/'));
app.set('view engine', 'html');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Skincare"
});

connection.connect();

app.get('/about',(req, res) => {
    connection.query("SELECT * FROM care",(err, result) => {
        if(err) {
            console.log(err);
            res.json({"error":true});
        }
        else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/dry',function(req,res){
  res.sendFile(path.join(__dirname+'/dry.html'));
});

router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});

router.get('/normal',function(req,res){
  res.sendFile(path.join(__dirname+'/normal.html'));
});


app.set('view engine','ejs');

//static files
app.use(express.static('./public'));



//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
