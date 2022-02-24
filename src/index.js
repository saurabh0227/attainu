const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const routes = require('./api/index');
// Init mongo
require('./config/mongo');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.listen(config.port, () => {
  console.log(`\🚀 Server is listening on ${config.port}`);
});
