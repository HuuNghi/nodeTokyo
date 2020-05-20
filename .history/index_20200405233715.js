const express = require('express');
const bodyParser = require('body-parser')
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

var users =  [
  {id: 1, name: 'Name 1'},
  {id: 2, name: 'Name 2'},
  {id: 3, name: 'Name 3'},
];

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Nghi',
  });
});

app.get('/users', (req, res) => {
  res.render('users/index', {
    users,
    q: req.query.q
  });
});

app.get('/users/search', (req, res) => {
  var q = req.query.q;
  var result = users.filter((user) => {
    return q ? user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 : users;
  });
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
    users.push({
      id: 3,
      name
    })
  }
  res.redirect('/users')
});
