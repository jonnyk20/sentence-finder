import React, { useState, useRef, ReactElement, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import Button, { ButtonSize } from "../Button";

import "./WordsExport.scss";
import {
  LanguageCodes,
  VocabItemType,
  SentenceExampleType,
} from "../../constants/translationTypes";
import WordsExportItem from "../WordExportItem/WordsExportItem";
import { exportToCSV } from "../../utils/exportUtils";
import CardSettings from "../CardSettings/CardSettings";
import { isNotNilOrEmpty } from "../../utils/utils";
import SentenceInput from "../SentenceInput/SentenceInput";
import WordsExportHeader from "../WordsExportHeader/WordsExportHeader";
import WordEdit from "../WordEdit/WordEdit";
import { track } from "../../utils/tracker";

const BASE_CLASS = "words-export";

type WordExportPropsType = {
  vocabItems: Map<string, VocabItemType | null>;
  sourceLang: LanguageCodes;
  translationLang: LanguageCodes;
  addSentenceToVocabItem: (word: string, sentence: SentenceExampleType) => void;
  removeSentenceFromVocabItem: (word: string, sentenceIndex: number) => void;
  deleteVocabItem: (word: string) => void;
  editWord: (
    originalWord: string,
    word: string,
    reading: string,
    definition: string
  ) => void;
};

const WordsExport: React.SFC<WordExportPropsType> = ({
  vocabItems,
  sourceLang,
  translationLang,
  addSentenceToVocabItem,
  removeSentenceFromVocabItem,
  deleteVocabItem,
  editWord,
}): ReactElement => {
  const [sentenceIndices, setSentenceIndices] = useState<Map<string, number>>(
    () => {
      const sentencesMap = new Map();
      [...vocabItems.keys()].forEach((key) => sentencesMap.set(key, 0));

      return sentencesMap;
    }
  );
  const [isExportingAnki, setIsExportingAnki] = useState(false);
  const [sentenceCreationWord, setSentenceCreationWord] = useState("");
  const [wordToEdit, setWordToEdit] = useState("");

  const isWritingSentence = isNotNilOrEmpty(sentenceCreationWord);

  useEffect(() => {
    setSentenceIndices((prev) => {
      const newSentenceIndices = new Map<string, number>(prev);

      [...vocabItems.keys()].forEach((key) => {
        if (!prev.has(key)) {
          newSentenceIndices.set(key, 0);
        }
      });
      return newSentenceIndices;
    });
  }, [vocabItems]);

  const ref = useRef<HTMLAnchorElement>(null);

  const openCardSettings = () => {
    setIsExportingAnki(true);
    track("card settings opened");
  };

  const closeCardSettings = () => {
    setIsExportingAnki(false);
    track("card settings closed");
  };

  const saveCSV = () => {
    exportToCSV(vocabItems, sentenceIndices, ref);
    track("csv saved");
  };

  const cycleSentence = (word: string) => {
    const currentIndex = sentenceIndices.get(word) as number;
    const vocabItem = vocabItems.get(word);

    const maxIndex = Math.max(vocabItem?.sentences!.length - 1, 0);
    const nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;

    const updatedSentenceIndices = new Map(sentenceIndices);
    updatedSentenceIndices.set(word, nextIndex);

    setSentenceIndices(updatedSentenceIndices);
    track("sentence cycled", { word, nextIndex });
  };

  const openSentenceInput = (word: string): void => {
    setSentenceCreationWord(word);
    track("sentence editor opened");
  };

  const closeSentenceInput = () => {
    setSentenceCreationWord("");
    track("sentence editor closed");
  };

  const addSentence = (word: string, sentence: SentenceExampleType) => {
    addSentenceToVocabItem(word, sentence);
    const sentenceCount = vocabItems.get(word)?.sentences?.length || 0;
    const updatedSentenceIndices = new Map(sentenceIndices);
    updatedSentenceIndices.set(word, sentenceCount);
    setSentenceIndices(updatedSentenceIndices);
    setSentenceCreationWord("");
  };

  const vocabItemToEdit = isNotNilOrEmpty(wordToEdit)
    ? (vocabItems.get(wordToEdit) as VocabItemType)
    : null;

  const removeWordToEdit = () => {
    setWordToEdit("");
    track("word editor closed");
  };

  const onSetWordToEdit = (word: string): void => {
    setWordToEdit(word);
    track("word editor opened", { word });
  };

  const onEditWord = (
    word: string,
    reading: string,
    definition: string
  ): void => {
    editWord(wordToEdit, word, reading, definition);
    track("word updated", {
      prevWord: wordToEdit,
      updatedWord: word,
      prevReading: vocabItemToEdit?.reading,
      updatedReading: reading,
      prevDefinition: vocabItemToEdit?.definition,
      updateDefinition: definition,
    });
    setWordToEdit("");
  };

  return (
    <div className={`${BASE_CLASS}`}>
      <div className={`${BASE_CLASS}__prompt`}>
        <div>
          <div className="text-bold">
            Edit the words, definition or sentences
          </div>
          <div>
            Click <FontAwesomeIcon icon={faSyncAlt} size="1x" /> to switch
            sentences
          </div>
        </div>
        <Button onClick={saveCSV} size={ButtonSize.SMALL}>
          Save CSV
        </Button>
        <Button onClick={openCardSettings} size={ButtonSize.SMALL}>
          Save Anki
        </Button>
      </div>
      <div className={`${BASE_CLASS}__vocab-items`}>
        {/* <div className={`${BASE_CLASS}__vocab-items__item`}>
          <div className="border-right padding-5 flex">
            <b>Word</b>
          </div>
          <div className="border-right padding-5 flex">Translation</div>
          <div className="border-right padding-5 flex">Sentence</div>
          <div className="border-right padding-5 flex">Translated</div>
          <div className="padding-5 flex fd-column jc-around">
            Edit Sentence
          </div>
        </div> */}
        <WordsExportHeader />
        {Array.from(vocabItems.entries()).map(([word, vocabItem], i) => (
          <WordsExportItem
            key={word}
            cycleSentence={cycleSentence}
            vocabItem={vocabItem}
            sentenceIndices={sentenceIndices}
            openSentenceInput={openSentenceInput}
            removeSentenceFromVocabItem={removeSentenceFromVocabItem}
            deleteVocabItem={deleteVocabItem}
            setWordToEdit={onSetWordToEdit}
            word={word}
          />
        ))}
      </div>
      {isExportingAnki && (
        <CardSettings
          vocabItems={vocabItems}
          sentenceIndices={sentenceIndices}
          closeCardSettings={closeCardSettings}
        />
      )}
      {isWritingSentence && (
        <SentenceInput
          word={sentenceCreationWord}
          addSentence={addSentence}
          closeSentenceInput={closeSentenceInput}
        />
      )}
      {isNotNilOrEmpty(vocabItemToEdit) && (
        <WordEdit
          removeWordToEdit={removeWordToEdit}
          editWord={onEditWord}
          vocabItem={vocabItemToEdit as VocabItemType}
        />
      )}
      <a href="null" download="vocab.csv" ref={ref} style={{ display: "none" }}>
        Download
      </a>
    </div>
  );
};

export default WordsExport;
