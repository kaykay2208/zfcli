const axios = require('axios');
const readlineSync = require('readline-sync');
const fs = require('fs');
const config =require('../config');
const https = require('https');

async function generateAccessToken(clientId, clientSecret, redirectUri, authorizationCode, env) {
  try {
    var tokenUrl = `https://accounts.${env}/oauth/v2/token`;
    const grantType = 'authorization_code';
    const scope = 'ZohoBooks.fullaccess.all,ZohoBooks.settings.create,ZohoBooks.customfunctions.create';

    const postData = {
      code: authorizationCode,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: grantType,
      scope: scope,
    };

    tokenUrl = `${tokenUrl}?${new URLSearchParams(postData).toString()}`;

    // Create an axios instance with a custom https agent that ignores SSL certificate verification
    const axiosInstance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    });

    const response = await axiosInstance.post(tokenUrl);
    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;

    var jsonForEnv = {
      access_token: access_token.toString(),
      clientId: clientId,
      clientSecret: clientSecret,
      refresh_token: refresh_token.toString(),
      expiry: Date.now() + (60 * 60 * 1000),
      env: env
    };

    const filePath = 'credentials.json';
    fs.writeFileSync(filePath, JSON.stringify(jsonForEnv, null, 2));
    console.log("Registration successful");

  } catch (error) {
    console.error("Error generating access token:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
  }
}

async function generateGrant() {
  
  const clientId = readlineSync.question('Enter your Client ID: ');

  
  const clientSecret = readlineSync.question('Enter your Client Secret: ', {
    hideEchoBack: true, 
  });

  const env =readlineSync.question('Enter you DC like zoho.com :');
  
  const redirectUri = readlineSync.question('Enter your Redirect URI: ');

  const authUrl = `https://accounts.${env}/oauth/v2/auth`;
  const scope = 'ZohoBooks.fullaccess.all,ZohoBooks.settings.create,ZohoBooks.customfunctions.create';
  const responseType = 'code';
  const state = 'testing';
  const accessType = 'offline';

  const redirectUrl = redirectUri;
  const params = `scope=${scope}&client_id=${clientId}&state=${state}&response_type=${responseType}&redirect_uri=${redirectUrl}&access_type=${accessType}&prompt=consent`;

  const authorizationUrl = `${authUrl}?${params}`;
  console.log(`Visit this URL and hit authorize: ${authorizationUrl}`);
  const grantToken = readlineSync.question('Now put the auth token here: ');
  generateAccessToken(clientId,clientSecret,redirectUri,grantToken,env);

}

module.exports={
  generateGrant:generateGrant,
};



