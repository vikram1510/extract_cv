import express from 'express';

const app = express();

app.use('/', (req, res) => {
  res.send('ye');
});

app.listen(4000, () => console.log('listening'));

