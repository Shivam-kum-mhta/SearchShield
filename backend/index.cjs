const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/context', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url);

    console.log(url)
    console.log('Successfully response sent')

    try{
      const dom = new JSDOM(response.data);
      const document = dom.window.document;
  
      const inlineStyles = Array.from(document.querySelectorAll('style')).map(style => style.textContent);
      // Extract linked stylesheets
    const linkedStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.href);

    // Fetch linked stylesheets content
    const linkedStylesContent = await Promise.all(linkedStyles.map(url => axios.get(url).then(res => res.data)));

    // Combine all styles
    const allStyles = [...inlineStyles, ...linkedStylesContent];
    console.log(allStyles)
    res.json({allStyles });
    }catch(err){console.log(err)}


  } catch (error) {
    console.log('server error')
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
