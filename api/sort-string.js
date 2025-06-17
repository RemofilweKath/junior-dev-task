const express = require('express');
const app = express();

app.use(express.json());

// POST endpoint to receive and process the input string
app.post('/', (req, res) => {
  try {
    const data = req.body?.data;

    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input: "data" must be a non-empty string.' });
    }

    // Split the string into an array of characters
    const charArray = data.split('');

    const sortedArray = charArray.sort();
    res.json({ word: sortedArray });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'An unexpected error occurred on the server.' })
  }

});

module.exports = app;