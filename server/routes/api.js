const express = require('express');
const jwt = require('jsonwebtoken');
const router = new express.Router();

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
const mysql = require('mysql2');
// create the connection
const con = mysql.createConnection(
    {host:'localhost', user: 'root', database: 'digitaljournal'}
);
con.promise().query('SELECT * FROM `users`')
  .then( ([rows,fields]) => {
    console.log(rows);
    res.status(200).json({
        status: 200,
        data:rows,
        message: {},
    });
  })
  .catch(console.log)
  .then( () => con.end());
 
});

router.post('/journals', (req, res) => {


    // get the client
    const mysql = require('mysql2');
    // create the connection
    const con = mysql.createConnection(
        {host:'localhost', user: 'root', database: 'digitaljournal'}
    );
    con.promise().query("INSERT INTO posts (Title, Content)    VALUES ('John', 'Doe')")
      .then( ([rows,fields]) => {
        console.log(rows);
        res.status(200).json({
            status: 200,
            data:rows,
            message: {},
        });
      })
      .catch(console.log)
      .then( () => con.end());
     
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
