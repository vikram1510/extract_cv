import express, { Request, Response } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import cors from 'cors';
import { csvWriter, parseHtmlFile } from './parser';
import { Details } from './script';
import { uploadToS3 } from './aws';
import asyncHandler from 'express-async-handler';

const s3BucketUrl = 'https://extracted-cv-csv-files.s3.eu-west-2.amazonaws.com';

// console.log(process.env);

const port = process.env.PORT || 4000;
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.get('/', (req, res) => {
  res.json({ message: 'i' });
});

app.post('/upload', asyncHandler(async (req , res) => {

  if (!req.files){
    throw new Error('No files found');
  }

  const records: Details[] = [];

  for (const pathName in req.files!){
    const file = req.files[pathName] as UploadedFile;
    const data = parseHtmlFile(file, pathName);
    records.push(data);
  }

  await csvWriter.writeRecords(records);
  
  const filename = 'output.csv';

  await uploadToS3(filename);

  res.json({ link: `${s3BucketUrl}/${filename}` });
}));

app.use((err: Error, _req: Request, res: Response, next) => {
  return res.status(400).send({ err: err.message ? err.message : JSON.stringify(err) });
});

app.listen(Number(port), '0.0.0.0',  () => console.log('listening on port ' + port));

