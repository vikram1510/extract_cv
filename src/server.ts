import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.get('/', (req, res) => {
  res.json({ message: 'k' });
});

app.post('/upload', (req , res) => {
  console.log(req.files!.review);

  res.json({ message: 'j' });
});

app.listen(4000, '0.0.0.0',  () => console.log('listening'));

