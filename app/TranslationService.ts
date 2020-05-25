import Sentence from './db/models/Sentence';
import { Op } from 'sequelize';
import { LanguageCodeType } from './constants/language';
import { Socket } from 'socket.io';

const getRegexp = {
  en: (word: string): string => `/(?:^|\W)${word}(?:$|\W)/gi`,
  eng: (word: string): string => `/(?:^|\W)${word}(?:$|\W)/gi`,
  fra: (word: string): string => `/(?:^|\W)${word}(?:$|\W)/gi`,
};

export type TranslationOptionsType = {
  words: string[];
  languageFrom: LanguageCodeType;
  languageTo: LanguageCodeType;
};

export type SentenceExampleType = {
  original: string;
  translations: string[];
};

export type VocabItemType = {
  word: string;
  sentences: SentenceExampleType[];
};

const translateWord = async (
  word: string,
  languageFrom: LanguageCodeType,
  languageTo: LanguageCodeType
): Promise<VocabItemType> => {
  try {
    console.time();
    const sentences = await Sentence.findAll({
      where: {
        text: {
          [Op.iLike]: `%${word}%`,
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

    const translatedSentences = await Promise.all(
      matchingSentences.map(async (s) => {
        const translationIds = s.sentenceTranslations.map(
          (st) => st.translationId
        );

        const translations = await Sentence.findAll({
          where: {
            tatoebaId: {
              [Op.in]: translationIds,
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
      })
    )
    return {
      word,
      sentences: translatedSentences.filter(s => s.translations.length > 0),
    };
  } catch (err) {
    console.log('err', err);
  }

  return {
    word,
    sentences: [],
  };
};

export const translateWords = async (
  options: TranslationOptionsType,
  socket: Socket
) => {
  const { words, languageFrom, languageTo } = options;

  for (let word of words) {
    try {
      const vocabItem: VocabItemType = await translateWord(
        word,
        languageFrom,
        languageTo
      );
      socket.emit('translation-success', vocabItem);
    } catch (err) {
      socket.emit('translation-error', {});
    }
  }
};
