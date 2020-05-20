const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user.router');

const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Nghi',
  });
});
