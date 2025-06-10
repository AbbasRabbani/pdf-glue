
// const express = require('express')
// const path = require('path')
// const app = express()
// const multer = require('multer')
// const { mergePdfs } = require('./merge')

// const upload = multer({ dest: 'uploads/' })
// app.use('/static', express.static('public'))
// const port = 3000

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "templates/index.html"))
// })



// app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
//   console.log(req.files)
//   let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
//   res.redirect(`http://localhost:3000/static/${d}.pdf`)
//   // res.send({data: req.files})
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })

import express from 'express';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { mergePdfs } from './merge.js'; // Add .js extension

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static(path.join(__dirname, 'public')));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  console.log(req.files);
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
  // res.send({data: req.files})
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
