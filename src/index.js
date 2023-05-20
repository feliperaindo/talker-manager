const express = require('express');

const { routes, ports } = require('./SSOT/exporter');
const { talkerRouter, rootRouter, loginRouter } = require('./routes/exporter');

const app = express();
app.use(express.json());

app.use(routes.ROOT, rootRouter);

app.use(routes.TALKER, talkerRouter);

app.use(routes.LOGIN, loginRouter);

app.listen(ports, () => {
  console.log('Online');
});
