const generateAccessToken=require('./generateAccessToken');

async function generateHeaders() {

    const access_token= await generateAccessToken.generateAccessToken();
    return {
      'Content-Type': 'multipart/form-data',
        'Authorization':`Zoho-oauthtoken ${access_token}`
    };
  }
  
  module.exports = generateHeaders;
  