import React, { useState, useRef, ReactElement, useEffect } from 'react';
import Papa from 'papaparse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import {
  replaceWordWithText,
  isNotNilOrEmpty,
  isNilOrEmpty,
  replaceWordWithElement,
} from '../../utils/utils';
import Button, { ButtonSize } from '../../components/Button';

import './WordsExport.scss';
import { LanguageCodes, VocabItemType } from '../../constants/translationTypes';

const BASE_CLASS = 'words-export';

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

      [...vocabItems.keys()].forEach(key => {
        if (!prev.has(key)) {
          newSentenceIndices.set(key, 0)
        }
      })
      return newSentenceIndices;
    });
  }, [vocabItems]);

  const ref = useRef<HTMLAnchorElement>(null);

  const saveCSV = () => {
    const data = [...vocabItems.keys()]
      .filter((word) => isNotNilOrEmpty(vocabItems.get(word)))
      .map((word) => {
        const vocabItem = vocabItems.get(word);
        const sentenceObject = vocabItem!.sentences[
          sentenceIndices.get(word) as number
        ];
        // const sentence = replaceWordWithText(
        //   word,
        //   sentenceObject?.original!
        // );
        const sentenceTranslation = sentenceObject?.translations[0]
        // # Todo, add dictionary definition
        return {
          word,
          // definition,
          sentence: sentenceObject.original,
          sentenceTranslation,
        };
      });
    var csv = Papa.unparse(data);
    var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = window.URL.createObjectURL(csvData);
    const a = ref.current;
    if (a?.href) {
      a.href = url;
      a.click();
    }
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
        <Button onClick={saveCSV} size={ButtonSize.SMALL}>Save CSV</Button>
      </div>
      <div className={`${BASE_CLASS}__vocab-items`}>
        <div className={`${BASE_CLASS}__vocab-items__item`}>
          <div className="border-right padding-5 flex">
            <b>Word</b>
          </div>
          <div className="border-right padding-5 flex">
            Sentence
          </div>
          <div className="border-right padding-5 flex">
            Translation
          </div>
          <div className="padding-5 flex fd-column jc-around">
            Change
          </div>
        </div>
        {Array.from(vocabItems.entries()).map(([word, vocabItem], i) => {
          const sentence =
            vocabItem?.sentences?.[sentenceIndices.get(word) as number];

          const orignialSentence = sentence?.original;
          const translation = sentence?.translations[0];
          console.log('word', word)
          console.log('sentenceIndices', sentenceIndices)
          console.log('vocabItem', vocabItem)
          console.log('sentence', sentence)

          return (
            <div key={i} className={`${BASE_CLASS}__vocab-items__item`}>
              <div className="border-right padding-5 flex">{word}</div>
              {isNilOrEmpty(vocabItem) && (
                <div
                  className={`${BASE_CLASS}__vocab-items__item__loading-indicator border-right padding-5 flex grid-column-3`}
                >
                  Loading...
                </div>
              )}

              {isNotNilOrEmpty(vocabItem) && (
                <>
                  <div className="border-right padding-5 flex">
                    {orignialSentence}
                  </div>
                  <div className="border-right padding-5 flex">
                    {translation}
                  </div>
                  <div className="padding-5 flex fd-column jc-around">
                    <Button
                      onClick={() => cycleSentence(word)}
                      size={ButtonSize.SMALL}
                    >
                      <FontAwesomeIcon icon={faSyncAlt} size="1x" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <a href="null" download="vocab.csv" ref={ref} style={{ display: 'none' }}>
        Download
      </a>
    </div>
  );
};

export default WordsExport;
