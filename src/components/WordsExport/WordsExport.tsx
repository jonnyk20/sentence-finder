import React, { useState, useRef, ReactElement, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import Button, { ButtonSize } from "../Button";

import "./WordsExport.scss";
import { LanguageCodes, VocabItemType } from "../../constants/translationTypes";
import WordsExportItem from "../WordExportItem/WordsExportItem";
import { exportToAnkiDeck, exportToCSV } from "../../utils/exportUtils";
import CardSettings from "../CardSettings/CardSettings";

const BASE_CLASS = "words-export";

type WordExportPropsType = {
  vocabItems: Map<string, VocabItemType | null>;
  sourceLang: LanguageCodes;
  translationLang: LanguageCodes;
};

const WordsExport: React.SFC<WordExportPropsType> = ({
  vocabItems,
  sourceLang,
  translationLang,
}): ReactElement => {
  const [sentenceIndices, setSentenceIndices] = useState<Map<string, number>>(
    () => {
      const sentencesMap = new Map();
      [...vocabItems.keys()].forEach((key) => sentencesMap.set(key, 0));

      return sentencesMap;
    }
  );

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

  const saveAnki = () => {
    exportToAnkiDeck(vocabItems, sentenceIndices, () =>
      console.log("exported")
    );
  };

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
        <Button onClick={saveAnki} size={ButtonSize.SMALL}>
          Save Anki Deck
        </Button>
      </div>
      <div className={`${BASE_CLASS}__vocab-items`}>
        <div className={`${BASE_CLASS}__vocab-items__item`}>
          <div className="border-right padding-5 flex">
            <b>Word</b>
          </div>
          <div className="border-right padding-5 flex">Translation</div>
          <div className="border-right padding-5 flex">Sentence</div>
          <div className="border-right padding-5 flex">Translated</div>
          <div className="padding-5 flex fd-column jc-around">Change</div>
        </div>
        {Array.from(vocabItems.entries()).map(([word, vocabItem], i) => (
          <WordsExportItem
            key={i}
            cycleSentence={cycleSentence}
            vocabItem={vocabItem}
            sentenceIndices={sentenceIndices}
          />
        ))}
      </div>
      <CardSettings />
      <a href="null" download="vocab.csv" ref={ref} style={{ display: "none" }}>
        Download
      </a>
    </div>
  );
};

export default WordsExport;
