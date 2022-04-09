var nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require("cors");



const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:"crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true}));

app.listen(5000, ()=>{
    console.log('listening on port 5000')
});

/**
 * Display all data
 */

app.get('/api/get', (req, res) => {
    const sqlGet = "select * from contact_db  ";
    db.query(sqlGet, (err, result) => {
              // const status = err.status || 500; 
                if(err){
                    console.log("err", err)
                }else{
                    //console.log("All Data", result)
                    res.status(200).send(result);// for the browser
                }
    })
});

/**
 * Login
 */

 app.post('/api/login', (req, res) => {
    const {name, email} = req.body;
    const sqlSelect = "select * from contact_db where name = ? and email = ?";
    db.query(sqlSelect, [name, email], (err, result) => {
        if(err){
            res.send({err : "Wrong username combination"})
        }
        if(result.length > 0)
        {
            console.log("Login Data", result)
            res.status(200).send(result);// for the browser
            /**
 * Send email
 */

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'brathebow@gmail.com',
      pass: 'chine1850'
    }
  });
  
  var mailOptions = {
    from: 'brathebow@gmail.com',
    to: 'alirhaiem@yahoo.fr',
    subject: `welcome back : ${name}`,
    text: `Nice to see back : ${name}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
/**
 * End send email
 */
        }else{
            res.send({message: 'Wrong name/email combination'});
        }
    })
});

/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Add data
 */

app.post('/api/post', (req, res) => {
    const {name, email, contact} = req.body;
   // const sqlInsert = "insert into contact_db (name, email, contact) values ('katkoutou', 'katkoutou@yahoo.com', 02314567) ";
    const sqlInsert = "insert into contact_db (name, email, contact) values (?, ?, ?) ";
        db.query(sqlInsert, [name, email, contact], (err, result) => {
            if(err){
                console.log("err", err)
            }else{
                console.log("ok", result)
                res.status(200).send(result);// for the browser
/**
 * Send email
 */

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'brathebow@gmail.com',
      pass: 'chine1850'
    }
  });
  
  var mailOptions = {
    from: 'brathebow@gmail.com',
    to: 'alirhaiem@yahoo.fr',
    subject: `welcome with us : ${name}`,
    text: `welcome with us : ${name}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
/**
 * End send email
 */
            }
        })
    console.log('hello world from the terminal'); // for the terminal
})

/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Delete data
 */

app.delete('/api/remove/:id', (req, res) => {
    const {id} = req.params;  
    const sqlInsert = "delete from contact_db where id = ?";

    db.query(sqlInsert, id, (err, result) => {

        if(err){
            console.log("err", err)
        }else{
            console.log("deleted item number :", id)
        }
    })
})

/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Update data
 */

 app.get('/api/get/:id', (req, res) => {
    const {id} = req.params;  
    const sqlGet = "select * from contact_db where id = ?  ";
    db.query(sqlGet, id, (err, result) => {
              // const status = err.status || 500; 
                if(err){
                    console.log("err", err)
                }else{
                    console.log("err", result)
                    res.status(200).send(result);// for the browser
                }
    })
});


 app.put('/api/update/:id', (req, res) => {
    const {id} = req.params;  
    const {name, email, contact} = req.body;
    const sqlUpdate = "update contact_db set name = ?, email = ?, contact = ? where id = ?  ";
    db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
              // const status = err.status || 500; 
                if(err){
                    console.log("err", err)
                }else{
                    console.log("err", result)
                    res.status(200).send(result);// for the browser
                }
    })
});

/////////////////////////////////////////////////////////////////////////////////////////////////







