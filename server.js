const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('dist')); // Vite build output

// API endpoint to save JSON data
app.post('/api/save', (req, res) => {
  const { filename, data } = req.body;
  const filePath = path.join(__dirname, 'data', filename);

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to save data' });
    }
    res.json({ message: 'Data saved successfully!' });
  });
});

// Serve data files
app.use('/data', express.static(path.join(__dirname, 'data')));

// Handle all other requests by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
