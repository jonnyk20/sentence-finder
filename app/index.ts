import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import dotenv from 'dotenv';
import db from './db/index';

dotenv.config();

const buildPath = '/../build/';

const app = express();

const routes = require('./routes');
const socket = require('./socket');

const server = http.createServer(app);
socket(server);

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

// test connection
db.sequelize
  .authenticate()
  .then((err: any) => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.log('Unable to connect to the database:', err);
  });

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
