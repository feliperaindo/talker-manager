const express = require('express');

const { PORT, ROOT, TALKER, LOGIN } = require('./utils/sourceOfTruth');
const { talkerRouter, rootRouter, loginRouter } = require('./routes/exporter');

const app = express();
app.use(express.json());

app.use(ROOT, rootRouter);

app.use(TALKER, talkerRouter);

app.use(LOGIN, loginRouter);

app.listen(PORT, () => {
  console.log('Online');
});
