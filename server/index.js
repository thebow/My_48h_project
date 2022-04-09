var nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require("cors");

//const cookieParser = require('cookie-parser');
 //const session = require('express-session');

const bcrypt = require('bcrypt');
const saltcost = 10;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:"crud_contact"
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true}));

//Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

// app.use(cors({
//     Origin: '*',
//     methods: ['GET', 'POST'],
//     credentials:true
// }));

app.use(cors());

// const corsConfig = {
//    // credentials: true,
//     origin: true,
// };
//app.use(cors(corsConfig));

// app.use(cookieParser);
// app.use(session({
//     key: 'userId',
//     secret:'rbk-c19-22-04-09',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { expires:60*60*24}
// }));

app.listen(5000, ()=>{
    console.log('listening on port 5000');
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

/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Login
 */

 app.post('/api/login', (req, res) => {
    const {password, email} = req.body;
    const sqlSelect = "select * from contact_db where email = ?";
    db.query(sqlSelect, email, (err, result) => {
        if(err){
            res.send({err : "Wrong email combination"})
        }
        if(result.length > 0)
        {
            console.log("Login Data", result)
            bcrypt.compare(password, result[0].password, (error, response)=>{
                if(response){
                   //req.session.user = result;
                  //console.log(req.session.user);
                    res.send(result);



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
    subject: `welcome back : ${result[0].name}`,
    text: `Nice to see you again :) : ${result[0].name}`
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
           // res.status(200).send(result);// for the browser

        }else{
            res.send({message: 'User does not exist'});
        }
    })

});

/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Add data
 */

app.post('/api/post', (req, res) => {
    const {name, email, contact, password} = req.body;
   // const sqlInsert = "insert into contact_db (name, email, contact) values ('katkoutou', 'katkoutou@yahoo.com', 02314567) ";
   bcrypt.hash(password, saltcost, (err, hash)=>{
    if(err){console.log(err)}
       const sqlInsert = "insert into contact_db (name, email, contact, password) values (?, ?, ?,?) ";
        db.query(sqlInsert, [name, email, contact, hash], (err, result) => {
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







