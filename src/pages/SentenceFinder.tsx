import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { uniq } from 'ramda';
import { isNotNilOrEmpty } from '../utils/utils';
import sampleTranslations from '../utils/sampleTranslations';
import Button from '../components/Button';
import { BuilderState } from '../constants/states';
import { LanguageCodes, VocabItemType } from '../constants/translationTypes';

import './SentenceFinder.scss';
import ChipsInput from '../components/ChipsInput/ChipsInput';
import SelectionList from '../components/SelectionList/SelectionList';
import WordsExport from '../components/WordList/WordsExport';

type TranslationOptionsType = {
  words: string[];
  languageFrom: LanguageCodes;
  languageTo: LanguageCodes;
};

const defaultItems = new Set(['hielo', 'hormiga', 'reconocer']);

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
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [nativeLanguage, setNativeLanguage] = useState<LanguageCodes>(
    LanguageCodes.EN
  );
  const [targetLanguage, setTargetLanguage] = useState<LanguageCodes>(
    LanguageCodes.SP
  );

  const [builderState, setBuilderState] = useState<BuilderState>(
    BuilderState.INPUTTING
  );

  const validItems = Array.from(items).filter(isNotNilOrEmpty);

  const handleSubmit = async (event: any) => {
    if (uniq(validItems).length === 0) return;

    event.preventDefault();
    socket?.off('word-translated');
    socket?.on('translation-success', (vocabItem: VocabItemType) => {
      console.log('received', vocabItem);
      setVocabMap((prevMap) => {
        const newVocabMap = new Map(prevMap);
        newVocabMap.set(vocabItem.word, vocabItem);
        return newVocabMap;
      });
    });

    const options: TranslationOptionsType = {
      words: uniq(validItems),
      languageFrom: targetLanguage,
      languageTo: nativeLanguage,
    };
    console.log('sending', options);
    socket?.emit(`get-sentences`, options);

    const newVocabMap = new Map();
    validItems.forEach((item) => newVocabMap.set(item, null));
    setVocabMap(newVocabMap);

    setBuilderState(BuilderState.PREPARING);
  };

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
    const socket = socketIOClient();

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  const isInputting = builderState === BuilderState.INPUTTING;
  const isPreparing = builderState === BuilderState.PREPARING;
  const isFailed = builderState === BuilderState.FAILED;

  return (
    <div className="sentence-finder container">
      <div>
        <h2>Sentence Finder 🌍</h2>
      </div>
      {isInputting && (
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
              <Button onClick={handleSubmit}>Find Sentences</Button>
            </div>
            <div className="sentence-finder__form__input">
              <ChipsInput items={items} setItems={setItems} />
            </div>
          </div>
        </>
      )}
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
