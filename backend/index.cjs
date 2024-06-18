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
    res.status(200).json(response.data)
    console.log('Successfully response sent')
   } catch (error) {
    console.log('server error')
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
