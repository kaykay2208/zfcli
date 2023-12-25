const readlineSync = require('readline-sync');
const axios = require('axios');
const fs =require('fs');
const generateHeaders = require('./headersGenerator');
const path = require('path');

const downloadFunction = async (functionName, repositoryName, functionID, isProduction) => {
  try {
    
    const customHeaders = await generateHeaders();

    
    const response = await axios.get(`https://cloud.localzoho.com/${portalname}/api/v2/function/download`, {
      params: {
        functionName,
        repositoryName,
        functionID,
        isProduction
      },
      responseType: 'arraybuffer', 
      headers: customHeaders
    });

    
    const folderName = 'downloaded_functions';
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    
    const zipFileName = path.join(folderName, `${functionName}.zip`);
    fs.writeFileSync(zipFileName, Buffer.from(response.data));

    console.log(`${zipFileName} downloaded successfully.`);
  } catch (error) {
    console.error('Error downloading function:', error.message);
  }
};
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
    downloadFunction(response.data.customfunction.function_name,`ZohoBooks_repo_${orgID}`,response.data.customfunction.drefunction_id,false);

  } catch (error) {
    console.error('Error creating function:', error.message);
   
  }
}

async function updateFunction(orgID) {
  try {
   
    
  } catch (error) {
    console.error('Error updating function:', error.message);
    
  }
}

module.exports = {
  createFunction,
  updateFunction,
};
