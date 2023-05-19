const express = require('express');

const { RULES_ROUTES } = require('./utils/sourceOfTruth');
const { talkerRouter, rootRouter, loginRouter } = require('./routes/exporter');

const app = express();
app.use(express.json());

app.use(RULES_ROUTES.ROOT, rootRouter);

app.use(RULES_ROUTES.TALKER, talkerRouter);

app.use(RULES_ROUTES.LOGIN, loginRouter);

app.listen(RULES_ROUTES.PORT, () => {
  console.log('Online');
});
