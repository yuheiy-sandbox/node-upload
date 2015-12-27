'use strict';
const path = require('path');
const express = require('express');
const multer = require('multer');

const getExtension = mimetype => {
  switch (mimetype) {
    case 'image/png':
      return 'png';
    default:
      return '';
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename(req, file, cb) {
    const ex = getExtension(file.mimetype);
    const rand = Math.random().toString(36).slice(2);
    const filename = ex ? `${rand}.${ex}` : rand;
    cb(null, filename);
  }
});

const upload = multer({ storage });

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

app.post('/profile', upload.single('avatar'), (req, res, next) => {
  console.log(req.file);
  res.status(204).end();
});

app.listen(3000);
