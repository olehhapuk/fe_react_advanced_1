const express = require('express');
// const path = require('path');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

// app.use(express.static(path.join(__dirname + '/public')));

/*
  Basic HTML response
  req: request
  res: response
*/
// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/about.html'));
// });

app.get('/', (req, res) => {
  res.render('index', { title: ';samd;almd;amd' });
});

app.listen(5000, () => {
  console.log('Server is running at port 5000');
});
