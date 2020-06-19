import request from 'request-promise';
import cheerio from 'cheerio';
import { Socket } from 'socket.io';

export enum LanguageCodeType {
  EN = 'en',
  FR = 'fr',
  SP = 'sp',
  JA = 'ja',
}

const languageStrings: { [code in LanguageCodeType]: string } = {
  [LanguageCodeType.EN]: 'english',
  [LanguageCodeType.FR]: 'french',
  [LanguageCodeType.SP]: 'spanish',
  [LanguageCodeType.JA]: 'japanese',
};


const getTranslaitonsFromHTML = (
  response: string,
): Array<string> => {
  const $ = cheerio.load(response);
  const translationElements = $(
    '.exact .lemma.featured .translation .dictLink'
  );

  const translations = translationElements.toArray().map((el) => $(el).text());

    return translations;
};


export const translate = async (
  word: string,
  languageFrom: LanguageCodeType,
  languageTo: LanguageCodeType
): Promise<Array<string>> => {
  try {
    const lingueeUrl = `https://www.linguee.com/${
      languageStrings[languageFrom]
    }-${
      languageStrings[languageTo]
    }/search?&query=${encodeURIComponent(word)}`;

    const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${
      process.env.SCRAPING_BEE_KEY
    }&render_js=false&url=${encodeURIComponent(lingueeUrl)}`;

    const res = await request(scrapingBeeUrl, {});

    const translations = getTranslaitonsFromHTML(res);

    return translations;
  } catch (error) {
    console.log('Error Translating', error);
    return [];
  }
};

export const getTranslations = async (
  word: string,
  languageFrom: LanguageCodeType,
  languageTo: LanguageCodeType,
): Promise<Array<string>> => {
    console.log('WORD', word);
    const translation = await translate(word, languageFrom, languageTo);
    console.log('TRANSLATION', translation);
    return translation;
};