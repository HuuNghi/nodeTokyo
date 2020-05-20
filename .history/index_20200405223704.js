const express = require('express');
const port = 3000;
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

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
    users: [
      {id: 1, name: 'Name 1'},
      {id: 2, name: 'Name 2'},
    ]
  });
});
