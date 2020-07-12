import React, { useState } from "react";
import {
  isNotNilOrEmpty,
  convertToLingueeLanguageCode,
  isDev,
} from "../utils/utils";
import Button from "../components/Button";
import { BuilderState } from "../constants/states";
import {
  LanguageCodes,
  VocabItemType,
  SentenceExampleType,
} from "../constants/translationTypes";

import ChipsInput from "../components/ChipsInput/ChipsInput";
import SelectionList from "../components/SelectionList/SelectionList";
import WordsExport from "../components/WordsExport/WordsExport";
import {
  JishoResponseType,
  getJapaneseTerm,
  LingueeResponseType,
} from "../utils/definitionUtils";
import { mockVocabItem } from "../utils/mockData";

import "./SentenceFinder.scss";
import { track } from "../utils/tracker";

type TranslationOptionsType = {
  words: string[];
  languageFrom: LanguageCodes;
  languageTo: LanguageCodes;
  onUpdate: (vi: VocabItemType) => void;
};

const getExampleSentences = async ({
  words,
  languageFrom,
  languageTo,
  onUpdate,
}: TranslationOptionsType) => {
  words.forEach(async (word) => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_SENTENCES_URL}/search?word=${word}&language_from=${languageFrom}&language_to=${languageTo}`
      );
      const json = await result.json();
      const vocabItem: VocabItemType = json.vocab_item;
      // const vocabItem = mockVocabItem;
      if (vocabItem) {
        onUpdate(vocabItem);
      }
    } catch (error) {}
  });
};

// This only workds for Japanese
const getDefinitions = async (
  options: TranslationOptionsType
): Promise<void> => {
  const { words, languageFrom, languageTo, onUpdate } = options;

  if (
    options.languageFrom === LanguageCodes.JA &&
    options.languageTo === LanguageCodes.EN
  ) {
    words.forEach(async (word) => {
      try {
        const res = await fetch(
          `https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(
            word
          )}`
        );
        const json: JishoResponseType = await res.json();

        const japaneseTerm = getJapaneseTerm(json);

        if (isNotNilOrEmpty(japaneseTerm)) {
          const vocabItem: VocabItemType = {
            word,
            reading: japaneseTerm?.reading,
            definition: japaneseTerm?.definitions.join(", "),
          };
          onUpdate(vocabItem);
        }
      } catch (error) {
        console.log("error translating:", error);
      }
    });
    return;
  }

  words.forEach(async (word) => {
    try {
      const res = await fetch(
        `/api/translations?word=${encodeURIComponent(
          word
        )}&languageFrom=${encodeURIComponent(
          convertToLingueeLanguageCode(languageFrom)
        )}&languageTo=${encodeURIComponent(
          convertToLingueeLanguageCode(languageTo)
        )}`
      );
      const json: LingueeResponseType = await res.json();

      const translations = json.translations;

      if (isNotNilOrEmpty(translations)) {
        const vocabItem: VocabItemType = {
          word,
          definition: translations?.join(", "),
        };
        onUpdate(vocabItem);
      }
    } catch (error) {
      console.log("error translating:", error);
    }
  });
};

const defaultItems = new Set<string>();

type CompletedSentencesPayload = {
  url: string;
};

const languageOptions: { [code in LanguageCodes]: string } = {
  [LanguageCodes.FR]: "French",
  [LanguageCodes.SP]: "Spanish",
  [LanguageCodes.JA]: "Japanese",
  [LanguageCodes.EN]: "English",
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

    // const words = ["友達"];
    const numberOfWordsThatCanBeAdded = Math.max(10 - vocabMap.size, 0);

    const wordsNotAddedYet = Array.from(words)
      .filter((w) => !vocabMap.has(w))
      .slice(0, numberOfWordsThatCanBeAdded);

    track("word added", {
      words: wordsNotAddedYet,
      languageFrom: targetLanguage,
      languageTo: nativeLanguage,
    });

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
            ...vi,
          };
          newVocabMap.set(vi.word, newOrUpdatedVI);
          return newVocabMap;
        });
      },
    };

    const newVocabMap = new Map(vocabMap);
    wordsNotAddedYet.forEach((item) => newVocabMap.set(item, null));
    setVocabMap(newVocabMap);
    getDefinitions(options);
    getExampleSentences(options);
  };

  const reset = () => {
    setItems(defaultItems);
    setBuilderState(BuilderState.INPUTTING);
  };

  const onChangeNativeLanguage = (value: string) => {
    const languageCode = value as LanguageCodes;
    setNativeLanguage(languageCode);
    track("native language set", { lang: value });
  };

  const onChangeTargetLanguage = (value: string) => {
    const languageCode = value as LanguageCodes;
    setTargetLanguage(languageCode);
    track("target language set", { lang: value });
  };

  const addSentenceToVocabItem = (
    word: string,
    sentence: SentenceExampleType
  ) => {
    const exitingVocabItem = vocabMap.get(word) as VocabItemType;
    const updatedVocabItem: VocabItemType = {
      ...exitingVocabItem,
      sentences: [...exitingVocabItem.sentences, sentence],
    };
    const updatedVocabMap = new Map(vocabMap);
    updatedVocabMap.set(word, updatedVocabItem);

    setVocabMap(updatedVocabMap);
    track("sentence added", {
      word,
      sentence: sentence.original,
      translation: sentence.translations[0],
    });
  };

  const removeSentenceFromVocabItem = (word: string, sentenceIndex: number) => {
    const exitingVocabItem = vocabMap.get(word) as VocabItemType;
    const updatedSentences = [...exitingVocabItem.sentences];
    updatedSentences[sentenceIndex] = { original: "", translations: [""] };

    const updatedVocabItem: VocabItemType = {
      ...exitingVocabItem,
      sentences: updatedSentences,
    };

    const updatedVocabMap = new Map(vocabMap);
    updatedVocabMap.set(word, updatedVocabItem);

    setVocabMap(updatedVocabMap);
    track("sentence deleted", { word });
  };

  const deleteVocabItem = (word: string) => {
    const updatedVocabMap = new Map(vocabMap);
    updatedVocabMap.delete(word);

    setVocabMap(updatedVocabMap);
    track("vocab item removed", { word });
  };

  const editWord = (
    originalWord: string,
    word: string,
    reading: string = "",
    definition: string = ""
  ): void => {
    const exitingVocabItem = vocabMap.get(word) as VocabItemType;
    const updatedVocabItem = {
      ...exitingVocabItem,
      word,
      reading,
      definition,
    };
    const updatedVocabMap = new Map(vocabMap);

    if (originalWord !== word) {
      updatedVocabMap.delete(originalWord);
    }
    updatedVocabMap.set(word, updatedVocabItem);

    setVocabMap(updatedVocabMap);
  };

  const isFailed = builderState === BuilderState.FAILED;

  return (
    <div className="sentence-finder container">
      <div>Questions/Feedback?</div>
      <div>
        <h2>Flashcard Generator 🌍</h2>
      </div>
      <>
        <div className="mb-10 text-light-color text-light">
          Automatically find translations for the words you're learning. Then,
          export it all as a csv or Anki Deck. (Note, the sentence finding
          feature is currently under maintenance. Check back in a week!)
        </div>

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
            <div className="mr-10 text-center">
              {`Enter the ${languageOptions[targetLanguage]} words you want to study below (up to 10)`}
            </div>
          </div>
          <div className="sentence-finder__form__input">
            <ChipsInput items={items} setItems={addItems} />
          </div>
        </div>
      </>
      <div>
        <WordsExport
          vocabItems={vocabMap}
          sourceLang={targetLanguage}
          translationLang={nativeLanguage}
          addSentenceToVocabItem={addSentenceToVocabItem}
          removeSentenceFromVocabItem={removeSentenceFromVocabItem}
          deleteVocabItem={deleteVocabItem}
          editWord={editWord}
        />
      </div>
      {/* )} */}

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
