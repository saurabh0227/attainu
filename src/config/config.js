require('dotenv-safe').config();

module.exports = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  mongo_uri: process.env.MONGO_URI,
  app_secret: process.env.APP_SECRET,
  token_expiry_time: process.env.TOKEN_EXPIRY_TIME,
};
