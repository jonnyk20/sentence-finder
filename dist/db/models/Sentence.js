"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const SentenceTranslation_1 = __importDefault(require("./SentenceTranslation"));
let Sentence = class Sentence extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Sentence.prototype, "text", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Sentence.prototype, "language", void 0);
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", Number)
], Sentence.prototype, "tatoebaId", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => SentenceTranslation_1.default, { sourceKey: 'tatoebaId', foreignKey: 'sentenceId' }),
    __metadata("design:type", Array)
], Sentence.prototype, "sentenceTranslations", void 0);
Sentence = __decorate([
    sequelize_typescript_1.DefaultScope(() => ({
        attributes: ["id", "text", "tatoebaId"],
        include: [SentenceTranslation_1.default],
    })),
    sequelize_typescript_1.Table
], Sentence);
exports.default = Sentence;
