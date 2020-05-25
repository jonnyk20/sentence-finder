import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import configs from './config/config';
import Sentence from './models/Sentence'
import SentenceTranslation from './models/SentenceTranslation'

type environmentType = 'development' | 'test' | 'production';
const env: string = process.env.NODE_ENV || 'development';

let envType: environmentType = 'development';

switch (env) {
  case 'test':
    envType = 'test';
    break;
  case 'production':
    envType = 'production';
    break;
  default:
    break;
}

const config: any = configs[envType];

const db: any = {};

let sequelize: Sequelize;

const custom: any = process.env[config.use_env_variable];

if (config.use_env_variable) {
  sequelize = new Sequelize(custom, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {...config, logging: true },
  );
}

sequelize.addModels([
 Sentence,
 SentenceTranslation
]);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
