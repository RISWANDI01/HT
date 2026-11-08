const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);
const path = require('path');

// Melayani file statis
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Deteksi koneksi Socket.io
io.on('connection', (socket) => {
  console.log('User terhubung:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User terputus:', socket.id);
  });
});

// Gunakan port Railway, dengan cadangan 8080 agar tidak crash
const PORT = process.env.PORT || 8080;
http.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
