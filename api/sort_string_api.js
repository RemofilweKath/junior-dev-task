const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// POST endpoint to receive and process the input string
app.post('/api/sort-string', (req, res) => {
  try {
    const data = req.body?.data;

    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input: "data" must be a non-empty string.' });
    }

    // Split the string into an array of characters
    const charArray = dataStr.split('');

    const sortedArray = charArray.sort();
    res.json({ word: sortedArray });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'An unexpected error occurred on the server.' })
  }

});

app.listen(PORT, () => console.log(`Server on running on http://localhost:${PORT}`),
console.log(`Server on running on ${PORT}`));