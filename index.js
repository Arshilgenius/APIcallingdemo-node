var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'learning',
    port: 3309
  });

  connection.connect(function(error){

    if(error)
    {
      console.log('error');
    }
    else
    {
      console.log('connected');
    }
  });

  app.post('/insert',function(req,res){

    var obj = {
        status : "SUCCESS"
      }

      var obj2 = req.body;

    var name = obj2.name;
    var secondname = obj2.secondname;
    var rollno = obj2.rollno;

    console.log(name);
    console.log(secondname);
    console.log(rollno);


    connection.query('INSERT INTO sample2 (name, secondname, rollno) VALUES ((?),(?),(?))',[name,secondname,rollno],function(error,rows,fields)
    {
     if(error)
     {
       console.log('error in the database');
     }
     else{
       console.log('successfull entry');
        res.send(JSON.stringify(obj));
     }
    });
  });


  app.get('/',function(req,res){
    var obj = {
      status : "SUCCESS"
    }
    res.send(JSON.stringify(obj));

  res.send('hello server is working');
  });

  app.listen(3000);