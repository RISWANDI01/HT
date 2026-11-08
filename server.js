const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Menyajikan file statis dari folder public
app.use(express.static('public'));

// Menangani koneksi Socket.io
io.on('connection', (socket) => {
  console.log('Client terhubung:', socket.id);

  // Menerima dan menyebarkan stream audio ke perangkat lain
  socket.on('audio-stream', (data) => {
    socket.broadcast.emit('audio-stream', data);
  });

  // Status PTT (Tekan & Bicara)
  socket.on('ptt-status', (status) => {
    socket.broadcast.emit('ptt-status', { active: status });
  });

  socket.on('disconnect', () => {
    console.log('Client terputus:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server HT berjalan di http://localhost:${PORT}`);
});