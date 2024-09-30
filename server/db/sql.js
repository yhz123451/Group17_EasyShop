// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123123',
//   database: 'easyshop',
//   port:3388,
// });
// module.exports = connection;


/**
 * 如果是旧版本mysql，去掉下面得三行代码，获取使用上面的注释的代码
 * authPlugins: {
    mysql_clear_password: () => () => Buffer.from(your_password + '\0')
  }
 */

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '20011020yhz',
  database: 'easyshop',
  port:3306,
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(your_password + '\0')
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
