const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse the incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/generate-pdf', async (req, res) => {
  // Launch a new browser session.
  const browser = await puppeteer.launch();
  
  // Create a new page.
  const page = await browser.newPage();
  
  // Set the content of the page that will be used in PDF generation.
  await page.setContent(req.body.htmlContent || '<h1>No content provided</h1>');

  // Generate PDF from the page content.
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true
  });

  // Close the browser.
  await browser.close();

  // Set the HTTP response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=mypdf.pdf');

  // Send the PDF buffer to the client
  res.send(pdf);
});

app.listen(port, () => {
  console.log(`PDF generation API is listening at http://localhost:${port}`);
});
