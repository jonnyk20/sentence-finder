import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const buildPath = '/../build/';

const app = express();

const routes = require('./routes');

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, buildPath)));

routes(app);

app.get('/ping', (req, res) => {
  console.log('IP', req.ip);

  res.end('pong');
});

app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, '/../build/', 'index.html'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
