const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Membaca file statis dari folder utama
app.use(express.static(__dirname));

// Wajib menggunakan process.env.PORT untuk Railway
const PORT = process.env.PORT || 8080;
http.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
