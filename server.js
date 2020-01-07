const express = require('express');
const app = express();
const logger = require('morgan');
const mysql = require('mysql');

app.use(logger('combined'));

app.get('/', (req, res) => {
  res.send('helllooooo!!!');
});

app.get('/student/:id', (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RedmondDesign18',
    database: 'classmate_database'
  });
  const studentId = req.params.id;
  const queryString = 'SELECT * FROM classmates WHERE student_id = ?';
  connection.query(queryString, [studentId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users: ' + err);
      res.sendStatus(500);
      return;
    }

    // const student = rows.map((row) => {
    //     return {lastName: row.student_lastName}
    // })

    console.log('I think we fetched users properly.');
    res.json(rows);
    // res.json(student);
  });
});

app.listen(3000, () => console.log('Server is running on port 3000.'));
