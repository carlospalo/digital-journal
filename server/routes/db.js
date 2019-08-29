
var mysql = require('mysql2');
if (process.env.NODE_ENV ) {
  var con ={
      host: process.env.host,
      user: process.env.username,
      database: process.env.database,
      password:process.env.password
    }
}else{
  var con = 
      {host:'localhost', user: 'root', database: 'digitaljournal'}
  ;
}

// con.connect();

module.exports = con;