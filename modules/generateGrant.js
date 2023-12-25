const axios = require('axios');
const readlineSync = require('readline-sync');
const fs = require('fs');
const config =require('../config');

async function generateAccessToken(clientId, clientSecret, redirectUri, authorizationCode,env) {
  var tokenUrl = `https://accounts.${env}/oauth/v2/token`;
  const grantType = 'authorization_code';
  const scope = 'ZohoBooks.fullaccess.all,ZOHOCLOUD.functionapi.ALL';

  const postData = {
    code: authorizationCode,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: grantType,
    scope: scope,
    
  };
tokenUrl = `${tokenUrl}?${new URLSearchParams(postData).toString()}`
  const response = await axios.post(tokenUrl);
  const access_token = response.data.access_token;
  const refresh_token = response.data.refresh_token;
  var jsonForEnv={};
  jsonForEnv.access_token=access_token.toString();
  jsonForEnv.clientId=clientId;
  jsonForEnv.clientSecret=clientSecret;
  jsonForEnv.refresh_token=refresh_token.toString();
  var currentTimeMillis = Date.now()+( 60 * 60 * 1000);
  jsonForEnv.expiry=currentTimeMillis;
  jsonForEnv.env=env;

const filePath = 'credentials.json';
fs.writeFileSync(filePath, JSON.stringify(jsonForEnv, null, 2));
console.log("Registration sunccessfull");
}
async function generateGrant() {
  
  const clientId = readlineSync.question('Enter your Client ID: ');

  
  const clientSecret = readlineSync.question('Enter your Client Secret: ', {
    hideEchoBack: true, 
  });

  const env =readlineSync.question('Enter you DC like zoho.com :');
  
  const redirectUri = readlineSync.question('Enter your Redirect URI: ');

  const authUrl = `https://accounts.${env}/oauth/v2/auth`;
  const scope = 'ZohoBooks.fullaccess.all,ZOHOCLOUD.functionapi.ALL';
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



