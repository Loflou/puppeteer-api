const express = require('express');
const puppeteer = require("puppeteer");
onst app = express();
const port = 3000;

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({ encoding: 'binary' });
    await browser.close();

    res.type('image/png');
    res.send(screenshot);
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    res.status(500).send(`Error taking screenshot: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
