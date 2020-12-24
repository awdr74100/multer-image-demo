const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 300 },
});

const uploadLimits = (err, req, res, next) => {
  console.log(err);
  if (err.message === 'Type error')
    return res.send({ success: false, message: '不支援的檔案格式' });
  if (err.message === 'File too large')
    return res.send({ success: false, message: '超過圖片限制大小' });
  // return next();
};

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

app.post('/images', upload.array('images'), uploadLimits, (req, res) => {
  console.log(req.files);
  res.send({ message: 'success' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`start ${port} port localhost`));
