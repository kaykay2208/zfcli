const readlineSync = require('readline-sync');
const axios = require('axios');
const fs =require('fs');
const generateHeaders = require('./headersGenerator');

async function createFunction(orgID) {
    const storedJson = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
  try {
    const functionName = readlineSync.question('Enter function name: ');
    const entity = readlineSync.question('Enter entity: ');
    const lang = readlineSync.question('Enter language: ');

    const jsonString = JSON.stringify({
      function_name: functionName,
      entity: entity,
      language: lang,
      include_orgvariables_params: false,
    });

    const formData = new FormData();
    formData.append('JSONString', jsonString);
    formData.append('organization_id', orgID);

    const headers = await generateHeaders(); 

    const response = await axios.post(`https://books.${storedJson.env}/api/v3/integrations/customfunctions`, formData, {
      headers: headers,
    });

    console.log('Create Function Response:', response.data);
    

  } catch (error) {
    console.error('Error creating function:', error.message);
   
  }
}

async function updateFunction(orgID) {
  try {
    // Similar implementation as createFunction, adjust as needed
    
  } catch (error) {
    console.error('Error updating function:', error.message);
    // Handle the error as needed
  }
}

module.exports = {
  createFunction,
  updateFunction,
};
