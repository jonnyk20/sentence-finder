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
const Sentence_1 = __importDefault(require("./db/models/Sentence"));
const sequelize_1 = require("sequelize");
const getRegexp = {
    en: (word) => `/(?:^|\W)${word}(?:$|\W)/gi`,
    eng: (word) => `/(?:^|\W)${word}(?:$|\W)/gi`,
    fra: (word) => `/(?:^|\W)${word}(?:$|\W)/gi`,
};
const translateWord = (word, languageFrom, languageTo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.time();
        const sentences = yield Sentence_1.default.findAll({
            where: {
                text: {
                    [sequelize_1.Op.iLike]: `%${word}%`,
                },
                language: languageFrom,
            },
        });
        console.timeEnd();
        // Somehow words with 's' at the end are getting past this regex
        // RegExp(`(\\b|\\s)(test)($|\\s)`, "giu")
        const regex = new RegExp(`(\\b|\\s)(${word})($|\\s)`, 'giu');
        const matchingSentences = sentences
            .filter((s) => {
            return regex.test(s.text);
        })
            .slice(0, 10);
        const translatedSentences = yield Promise.all(matchingSentences.map((s) => __awaiter(void 0, void 0, void 0, function* () {
            const translationIds = s.sentenceTranslations.map((st) => st.translationId);
            const translations = yield Sentence_1.default.findAll({
                where: {
                    tatoebaId: {
                        [sequelize_1.Op.in]: translationIds,
                    },
                    language: languageTo,
                },
            });
            const formattedTranslations = translations.map((t) => {
                return t.text;
            });
            return {
                original: s.text,
                translations: formattedTranslations,
            };
        })));
        return {
            word,
            sentences: translatedSentences.filter(s => s.translations.length > 0),
        };
    }
    catch (err) {
        console.log('err', err);
    }
    return {
        word,
        sentences: [],
    };
});
exports.translateWords = (options, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { words, languageFrom, languageTo } = options;
    for (let word of words) {
        try {
            const vocabItem = yield translateWord(word, languageFrom, languageTo);
            socket.emit('translation-success', vocabItem);
        }
        catch (err) {
            socket.emit('translation-error', {});
        }
    }
});
