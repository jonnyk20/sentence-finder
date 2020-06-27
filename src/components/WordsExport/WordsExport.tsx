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

const BASE_CLASS = "words-export";

type WordExportPropsType = {
  vocabItems: Map<string, VocabItemType | null>;
  sourceLang: LanguageCodes;
  translationLang: LanguageCodes;
  addSentenceToVocabItem: (word: string, sentence: SentenceExampleType) => void;
  removeSentenceFromVocabItem: (word: string, sentenceIndex: number) => void;
  deleteVocabItem: (word: string) => void;
  editWord: (word: string, reading: string, definition: string) => void;
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

  const openCardSettings = () => setIsExportingAnki(true);
  const closeCardSettings = () => setIsExportingAnki(false);

  const saveCSV = () => {
    exportToCSV(vocabItems, sentenceIndices, ref);
  };

  const cycleSentence = (word: string) => {
    const currentIndex = sentenceIndices.get(word) as number;
    const vocabItem = vocabItems.get(word);

    const maxIndex = Math.max(vocabItem?.sentences!.length - 1, 0);
    const nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;

    const updatedSentenceIndices = new Map(sentenceIndices);
    updatedSentenceIndices.set(word, nextIndex);

    setSentenceIndices(updatedSentenceIndices);
  };

  const openSentenceInput = (word: string): void => {
    setSentenceCreationWord(word);
  };

  const closeSentenceInput = () => {
    setSentenceCreationWord("");
  };

  const addSentence = (word: string, sentence: SentenceExampleType) => {
    addSentenceToVocabItem(word, sentence);
    const sentenceCount = vocabItems.get(word)?.sentences?.length || 0;
    const updatedSentenceIndices = new Map(sentenceIndices);
    updatedSentenceIndices.set(word, sentenceCount);
    setSentenceIndices(updatedSentenceIndices);
    setSentenceCreationWord("");
  };

  const removeWordToEdit = () => setWordToEdit("");

  const vocabItemToEdit = isNotNilOrEmpty(wordToEdit)
    ? (vocabItems.get(wordToEdit) as VocabItemType)
    : null;

  return (
    <div className={`${BASE_CLASS}`}>
      <div className={`${BASE_CLASS}__prompt`}>
        <div>
          <div className="text-bold">Pick sentences and save them</div>
          <div>
            Click <FontAwesomeIcon icon={faSyncAlt} size="1x" /> to change
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
            key={i}
            cycleSentence={cycleSentence}
            vocabItem={vocabItem}
            sentenceIndices={sentenceIndices}
            openSentenceInput={openSentenceInput}
            removeSentenceFromVocabItem={removeSentenceFromVocabItem}
            deleteVocabItem={deleteVocabItem}
            setWordToEdit={setWordToEdit}
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
          editWord={editWord}
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
