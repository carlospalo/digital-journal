const express = require('express');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const mysql = require('mysql2');


var con = require('./db.js'); 


router.get('/protected', (req, res) => {
    res.status(200).json({
        status: 200,
        data: {
              secretMessage: "This is a secret message from the API."
        },
        message: {},
    });
});

router.get('/journals', (req, res) => {


// get the client

// create the connection
var connection = mysql.createConnection(con);
connection.promise().query('SELECT * FROM `Posts` WHERE user_id = ?',[res.locals.user.id])
  .then( ([rows,fields]) => {
    console.log(rows);
    res.status(200).json({
        status: 200,
        data:rows,
        message: {},
    });
  })
  .catch(console.log)
  .then( () => connection.end());
 
});

router.post('/journals', (req, res) => {


    // if (!req.headers.authorization) {
    //     return res.status(401).json({status: 401, data: {}, message: 'Unauthorized.'});
    // }

    // const token = req.headers.authorization.split(' ')[1];

    // return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) { return res.status(401).json({status: 401, data: {}, message: 'Unauthorized.'}); }

    //     const userId = decoded.id;

    //     console.log(req.body);
    
    //     // get the client
    //     const mysql = require('mysql2');
    //     // const user_id=res.locals.user.id
    //     // create the connection
    //     const con = mysql.createConnection(
    //         {host:'localhost', user: 'root', database: 'digitaljournal'}
    //     );
    //     con.promise().query("INSERT INTO posts (Title, Content)    VALUES (?,?,?)",[req.body.title,req.body.content,userId])
    //       .then( ([rows,fields]) => {
    //         // console.log(rows);
    //         res.status(200).json({
    //             status: 200,
    //             data:rows,
    //             message: {},
    //         });
    //       })
    //       .catch(console.log)
    //       .then( () => con.end());
    // });


    // const mysql = require('mysql2');
    // // const user_id=res.locals.user.id
    // // create the connection
    // const con = mysql.createConnection(
    //     {host:'localhost', user: 'root', database: 'digitaljournal'}
    // );
var connection = mysql.createConnection(con);

connection.promise().query("INSERT INTO Posts (Title, Content,user_id)    VALUES (?,?,?)",[req.body.title,req.body.content,res.locals.user.id])
      .then( ([rows,fields]) => {
        // console.log(rows);
        res.status(200).json({
            status: 200,
            data:rows,
            message: {},
        });
      })
      .catch(console.log)
      .then( () => connection.end());

   
     
    });

router.get('/me', (req, res) => {
    res.status(200).json({
        status: 200,
        data: {
            token: res.locals.token,
            user: {
                email: res.locals.user.email
            }
        },
        message: {},
    });
});

module.exports = router;
