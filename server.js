const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Melayani file statis
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Wajib menggunakan port dinamis dari Railway
const PORT = process.env.PORT;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
