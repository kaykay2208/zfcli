const axios = require('axios');
const fs = require('fs');

const filePath = 'credentials.json';

async function generateAccessToken() {
  const storedJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (storedJson.expiry > Date.now()) {
    return storedJson.access_token;
  } else {
    var tokenUrl = `https://accounts.${storedJson.env}/oauth/v2/token`;

    const param= {
      refresh_token: storedJson.refresh_token,
      client_id: storedJson.clientId,
      client_secret: storedJson.clientSecret,
      grant_type: 'refresh_token',
    }
    tokenUrl = `${tokenUrl}?${new URLSearchParams(param).toString()}`
    const response = await axios.post(tokenUrl);

    storedJson.access_token = response.data.access_token;
    storedJson.expiry = Date.now() + (60 * 60 * 1000); 
    fs.writeFileSync(filePath, JSON.stringify(storedJson, null, 2));
    return storedJson.access_token;
  }
}


module.exports={
  generateAccessToken:generateAccessToken,
};

