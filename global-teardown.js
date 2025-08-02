// global-teardown.js
const fs = require('fs');
const path = require('path');

const storageFile = path.join(__dirname, 'storage', 'auth.json');

module.exports = async () => {
  if (fs.existsSync(storageFile)) {
    fs.unlinkSync(storageFile);
    console.log('Deleted storage/auth.json after test run.');
  } else {
    console.log('No auth.json found to delete.');
  }
};
