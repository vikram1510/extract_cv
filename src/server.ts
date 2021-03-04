import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const port = 8081;
const app = express();

app.use(cors());

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.get('/', (req, res) => {
  res.json({ message: 'i' });
});

app.post('/upload', (req , res) => {
  console.log(req.files!.review);

  res.json({ message: 'j' });
});

app.listen(port, '0.0.0.0',  () => console.log('listening on port ' + port));

