const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-codetokyo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connect error'));
db.once('open', () => {
  console.log('connected');
});

const userRouter = require('./routers/user.router');
const authRouter = require('./routers/auth.router');
const productRouter = require('./routers/product.router');
const auth = require('./middlewares/auth.middleware');

const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/users', auth.authentication, userRouter);
app.use('/products',auth.authentication, productRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Nghi',
  });
});
