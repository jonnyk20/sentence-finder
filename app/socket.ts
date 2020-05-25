import socketIO from 'socket.io';
import { Server } from 'http';
import { translateWords } from './TranslationService';

const socket = (server: Server) => {
  const io = socketIO.listen(server);
  io.on('connection', (socket) => {
    console.log('a user is connected!');
    socket.emit('update', { hello: 'world!' });
    socket.on('boom', (msg) => {
      console.log('msg from client', msg);
    });

    socket.on('get-sentences', async (options) => {
      console.log('starting translation', options);
      translateWords(options, socket);
    });
  });
};

module.exports = socket;
