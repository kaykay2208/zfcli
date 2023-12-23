// config.js
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

function addKeytoEnv(key,value){
    const envFilePath = '.env';
  
  if (!fs.existsSync(envFilePath)) {
    fs.writeFileSync(envFilePath, `${key}=${value}\n`);
  } else {
   
    fs.appendFileSync(envFilePath, `${key}=${value}\n`);
  }
  }

var config = {
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  redirectUri: process.env.REDIRECT_URI || '',
  refreshtoken:process.env.REFRESH_TOKEN ||'',
  accessToken:process.env.ACCESS_TOKEN ||'',
    expiry:process.env.EXP||'',
    env:process.env.ENV||'',
};

module.exports = config;