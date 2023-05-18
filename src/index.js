const express = require('express');

const { PORT, ROOT, TALKER } = require('./utils/sourceOfTruth');
const { talkerRouter, rootRouter } = require('./routes/exporter');

const app = express();
app.use(express.json());

app.use(ROOT, rootRouter);

app.use(TALKER, talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
