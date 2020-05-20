const express = require('express');
const port = 3000;
const app = express();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});
