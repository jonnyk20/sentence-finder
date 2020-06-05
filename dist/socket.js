"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const TranslationService_1 = require("./TranslationService");
const socket = (server) => {
    const io = socket_io_1.default.listen(server);
    io.on('connection', (socket) => {
        console.log('a user is connected!');
        socket.emit('update', { hello: 'world!' });
        socket.on('boom', (msg) => {
            console.log('msg from client', msg);
        });
        socket.on('get-sentences', (options) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('starting translation', options);
            TranslationService_1.translateWords(options, socket);
        }));
    });
};
module.exports = socket;
