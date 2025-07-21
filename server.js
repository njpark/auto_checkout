const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the /autocheckout route
app.use('/autocheckout', (req, res, next) => {
  // Log query parameters
  const { debug, hour, min } = req.query;
  console.log(`debug: ${debug}, hour: ${hour}, min: ${min}`);
  next();
}, express.static(path.join(__dirname, 'app')));

// Show guide message on root access
app.get('/', (req, res) => {
  res.send('Access: http://[server IP]:3000/autocheckout?debug=on&hour=16&min=00');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 