"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config/config"));
const Sentence_1 = __importDefault(require("./models/Sentence"));
const SentenceTranslation_1 = __importDefault(require("./models/SentenceTranslation"));
const env = process.env.NODE_ENV || 'development';
let envType = 'development';
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
const config = config_1.default[envType];
const db = {};
let sequelize;
const custom = process.env[config.use_env_variable];
if (config.use_env_variable) {
    sequelize = new sequelize_typescript_1.Sequelize(custom, config);
}
else {
    sequelize = new sequelize_typescript_1.Sequelize(config.database, config.username, config.password, Object.assign(Object.assign({}, config), { logging: true }));
}
sequelize.addModels([
    Sentence_1.default,
    SentenceTranslation_1.default
]);
db.sequelize = sequelize;
db.Sequelize = sequelize_typescript_1.Sequelize;
exports.default = db;
