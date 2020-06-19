import { Express, Request, Response } from 'express';
import { LanguageCodeType, translate } from './services/Translation';

type TranslationOptions = {
    languageFrom: LanguageCodeType;
    languageTo: LanguageCodeType;
    word: string;
}

const routes = (app: Express) => {
    app.get('/api/translations', async (req: Request, res: Response) => {
        // const scores = await TaxaChallengeScore.findAll();
        const { word, languageFrom, languageTo } = req.query as TranslationOptions;
        console.log('options', req.query);
        
        const translations = await translate(word, languageFrom, languageTo);
        console.log('TRANSLATIONS', translations);
    
        return res.json({ translations });
      });
};

module.exports = routes;
