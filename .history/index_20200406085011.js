const express = require('express');
const shortid = require('shortid');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const port = 3000;
const app = express();

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: []})
  .write();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

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
  var result = db.get('users').find({name: q}).value();
  console.log(result);
  res.render('users/index', {
    users: result ? [result] : db.get('users').value(),
    q
  });
});

app.get('/users/create', (req, res) => {
  res.render('users/create');
});

app.get('/users/:id', (req, res) => {
  var id = req.params.id;
  var user = db.get('users').find({ id }).value();
  res.render('users/view', { user });
});

app.post('/users/create', (req, res) => {
  var name = req.body.name;
  if (name) {
    db.get('users').push({
      id: shortid.generate(),
      name
    }).write();
  }
  res.redirect('/users')
});
