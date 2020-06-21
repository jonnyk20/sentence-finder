import React, { useState, useEffect } from 'react';
import { isNotNilOrEmpty, convertToLingueeLanguageCode } from '../utils/utils';
import Button from '../components/Button';
import { BuilderState } from '../constants/states';
import { LanguageCodes, VocabItemType } from '../constants/translationTypes';

import './SentenceFinder.scss';
import ChipsInput from '../components/ChipsInput/ChipsInput';
import SelectionList from '../components/SelectionList/SelectionList';
import WordsExport from '../components/WordsExport/WordsExport';
import { JishoResponseType, getJapaneseTerm, LingueeResponseType } from '../utils/definitionUtils';

type TranslationOptionsType = {
  words: string[];
  languageFrom: LanguageCodes;
  languageTo: LanguageCodes;
  onUpdate: (vi: VocabItemType) => void;
};

// const BASE_URL = 'https://sentence-finder-backend.herokuapp.com';
const BASE_URL = 'http://localhost:5000';

const getExampleSentences = async ({ words, languageFrom, languageTo, onUpdate }: TranslationOptionsType) => {
  words.forEach(async word => {
    try {
      const result = await fetch(`${BASE_URL}/search?word=${word}&language_from=${languageFrom}&language_to=${languageTo}`)
      const json = await result.json();
      const vocabItem: VocabItemType = json.vocab_item;
      console.log('json', json)
      console.log('vocabItem', vocabItem)
      if (vocabItem) {
        onUpdate(vocabItem)
      }
    } catch (error) {
    }
  });
};

// This only workds for Japanese
const getDefinitions = async (options: TranslationOptionsType): Promise<void> => {
  const { words, languageFrom, languageTo, onUpdate } = options;

  if (options.languageFrom === LanguageCodes.JA) {
    words.forEach(async word => {
      try {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`);
        const json: JishoResponseType = await res.json();

        const japaneseTerm = getJapaneseTerm(json);

        if (isNotNilOrEmpty(japaneseTerm)) {
          const vocabItem: VocabItemType = {
            word,
            reading: japaneseTerm?.reading,
            definition: japaneseTerm?.definitions.join(', ')
          }
          onUpdate(vocabItem)
        }
      } catch (error) {
        console.log('error translating:', error)
      }
    });
  }

  words.forEach(async word => {
    try {
      const res = await fetch(`/api/translations?word=${encodeURIComponent(word)}&languageFrom=${encodeURIComponent(convertToLingueeLanguageCode(languageFrom))}&languageTo=${encodeURIComponent(convertToLingueeLanguageCode(languageTo))}`);
      const json: LingueeResponseType = await res.json();

      const translations = json.translations;

      if (isNotNilOrEmpty(translations)) {
        const vocabItem: VocabItemType = {
          word,
          definition: translations?.join(', ')
        }
        onUpdate(vocabItem)
      }
    } catch (error) {
      console.log('error translating:', error)
    }
  });


};

const defaultItems = new Set<string>();

type CompletedSentencesPayload = {
  url: string;
};

const languageOptions: { [code in LanguageCodes]: string } = {
  [LanguageCodes.FR]: 'French',
  [LanguageCodes.SP]: 'Spanish',
  [LanguageCodes.JA]: 'Japanese',
  [LanguageCodes.EN]: 'English',
};

const languageOptionsArray = Object.entries(
  languageOptions
).map(([key, label]) => ({ key, label }));

const Builder = () => {
  const [items, setItems] = useState<Set<string>>(defaultItems);
  const [vocabMap, setVocabMap] = useState<Map<string, VocabItemType | null>>(
    new Map()
  );
  const [nativeLanguage, setNativeLanguage] = useState<LanguageCodes>(
    LanguageCodes.EN
  );
  const [targetLanguage, setTargetLanguage] = useState<LanguageCodes>(
    LanguageCodes.JA
  );

  const [builderState, setBuilderState] = useState<BuilderState>(
    BuilderState.INPUTTING
  );

  const addItems = (words: Set<string>) => {
    if (builderState === BuilderState.INPUTTING) {
      setBuilderState(BuilderState.PREPARING);
    }

    const wordsNotAddedYet = Array.from(words).filter(w => !vocabMap.has(w));

      const options: TranslationOptionsType = {
        words: wordsNotAddedYet,
        languageFrom: targetLanguage,
        languageTo: nativeLanguage,
        onUpdate: (vi) => {
          setVocabMap((prevMap) => {
            const newVocabMap = new Map(prevMap);
            const existingVI = prevMap.get(vi.word) || {};
            const newOrUpdatedVI: VocabItemType = {
              ...existingVI,
              ...vi
            }
            newVocabMap.set(vi.word, newOrUpdatedVI);
            return newVocabMap;
          });
        }
      };
    
      const newVocabMap = new Map(vocabMap);
      wordsNotAddedYet.forEach((item) => newVocabMap.set(item, null));
      setVocabMap(newVocabMap);
      getDefinitions(options);
      getExampleSentences(options);
  }

  const reset = () => {
    setItems(defaultItems);
    setBuilderState(BuilderState.INPUTTING);
  };

  const onChangeNativeLanguage = (value: string) => {
    const languageCode = value as LanguageCodes;
    setNativeLanguage(languageCode);
  };

  const onChangeTargetLanguage = (value: string) => {
    const languageCode = value as LanguageCodes;
    setTargetLanguage(languageCode);
  };

  useEffect(() => {
    // fetch(BASE_URL)
  }, []);

  const isInputting = builderState === BuilderState.INPUTTING;
  const isPreparing = builderState === BuilderState.PREPARING;
  const isFailed = builderState === BuilderState.FAILED;

  return (
    <div className="sentence-finder container">
      <div>
        <h2>Sentence Finder 🌍</h2>
      </div>
      {/* {isInputting && ( */}
        <>
          <div className="mb-10 text-light-color text-light">
            Automatic sentence cards for language learners
          </div>
          {/* <div className="mv-5 text-small">1. Choose your language</div>
          <div className="mv-5 text-small">1. Choose your words</div>
          <div className="mt-5 mb-20 text-small">
            3. Click 'Find Sentences' and we'll find translations and sentences
            for you
          </div> */}

          <div className="sentence-finder__form">
            <div className="sentence-finder__form__language-selection">
              <div>Native Language</div>
              <SelectionList
                options={languageOptionsArray}
                onChange={onChangeNativeLanguage}
                initialValue={nativeLanguage}
              />
            </div>
            <div className="sentence-finder__form__language-selection">
              <div>Target Language</div>
              <SelectionList
                options={languageOptionsArray}
                defaultText="e.g. Reptiles"
                onChange={onChangeTargetLanguage}
                initialValue={targetLanguage}
              />
            </div>
            <div className="sentence-finder__form__submission mv-20">
              <div className="mr-10">
                {`Enter ${languageOptions[targetLanguage]} words below and then click 'Find Sentences'`}
              </div>
            </div>
            <div className="sentence-finder__form__input">
              <ChipsInput items={items} setItems={addItems} />
            </div>
          </div>
        </>
      {/* )} */}
      {isPreparing && (
        <div>
          <WordsExport
            vocabItems={vocabMap}
            sourceLang={targetLanguage}
            translationLang={nativeLanguage}
          />
        </div>
      )}

      {isFailed && (
        <div className="mv-20">
          <div className="mb-20">Failed to Find Sentences</div>
          <Button onClick={reset}>Try again</Button>
        </div>
      )}
    </div>
  );
};

export default Builder;
