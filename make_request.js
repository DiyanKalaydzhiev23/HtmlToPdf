const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define the data to be sent in the POST request
const postData = {
  htmlContent: '<h1>Hello, World!</h1>'
};

// Configure Axios to make a POST request https://puppeteer.diyankalaydzhie.repl.co/generate-pdf
axios.post('https://html-to-pdf-x2y3.onrender.com/generate-pdf', postData, {
  responseType: 'arraybuffer', // Important to handle binary data
  headers: {
    'Content-Type': 'application/json'
  }
})
.then((response) => {
  // Use the path module to save the file in the current directory
  const pdfPath = path.resolve(__dirname, 'output.pdf');

  // Write the PDF to the filesystem
  fs.writeFile(pdfPath, response.data, (error) => {
    if (error) {
      console.error('Error writing PDF to file:', error);
    } else {
      console.log(`PDF saved successfully: ${pdfPath}`);
    }
  });
})
.catch((error) => {
  console.error('Error generating PDF:', error);
});
