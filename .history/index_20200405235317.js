const express = require('express');
const bodyParser = require('body-parser')
const port = 3000;
const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: []})
  .write()

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Nghi',
  });
});

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value(),
    q: req.query.q
  });
});

app.get('/users/search', (req, res) => {
  var q = req.query.q;
  var result = db.get('users').find({name: q});
  // var result = db.get('users').filter((user) => {
  //   return q ? user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 : db.get('users');
  // });
  res.render('users/index', {
    users: result,
    q
  });
});

app.get('/users/create', (req, res) => {
  res.render('users/create');
});

app.post('/users/create', (req, res) => {
  var name = req.body.name;
  if (name) {
    db.get('users').push({
      name
    }).write();
  }
  res.redirect('/users')
});
