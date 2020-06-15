export enum LanguageCodes {
  FR = 'fra',
  SP = 'spa',
  JA = 'jpn',
  EN = 'eng',
}

export type SentenceExampleType = {
  original: string;
  translations: string[];
};

export type VocabItemType = {
  word: string;
  sentences?: SentenceExampleType[];
  reading?: string;
  definition?: string;
};

/*
  word: '意地悪',
  translations: ['ill-tempered', 'unkind', 'malicious'],
  examples: [
    {
      targetLanguage: {
        sentence:
          '分離不安の子犬は、行儀が悪いわけでも、飼い主に意地悪をしているわけでもありません。',
        sourceUrl:
          'http://www.eukanuba.jp/ja-JP/puppy-guide/easing-your-puppys-separation-anxiety.jspx',
        sourceName: 'eukanuba.jp',
      },
      translation: {
        sentence:
          'Pups who suffer from separation anxiety are not misbehaving or being spiteful.',
        sourceUrl:
          'http://www.eukanuba.cz/en-US/puppy-guide/easing-your-puppys-separation-anxiety.jspx',
        sourceName: 'eukanuba.cz',
      },
    },
  ],


*/
