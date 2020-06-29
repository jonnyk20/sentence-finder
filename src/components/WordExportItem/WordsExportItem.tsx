import React, { ReactElement } from "react";
import {
  faSyncAlt,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { isNotNilOrEmpty, isNilOrEmpty } from "../../utils/utils";
import { VocabItemType } from "../../constants/translationTypes";
import Button, { ButtonSize } from "../Button";

import "./WordsExportItem.scss";

const BASE_CLASS = "words-export-item";

type PropsType = {
  vocabItem: VocabItemType | null;
  sentenceIndices: Map<string, number>;
  cycleSentence: (word: string) => void;
  openSentenceInput: (word: string) => void;
  removeSentenceFromVocabItem: (word: string, senenceIndex: number) => void;
  deleteVocabItem: (word: string) => void;
  setWordToEdit: (word: string) => void;
  word: string;
};

const WordsExportItem: React.SFC<PropsType> = ({
  vocabItem,
  sentenceIndices,
  cycleSentence,
  openSentenceInput,
  removeSentenceFromVocabItem,
  deleteVocabItem,
  setWordToEdit,
  word,
}): ReactElement => {
  const { sentences, reading, definition } = vocabItem || {};
  const sentenceIndex = (sentenceIndices.get(word) as number) || 0;
  const sentence = sentences?.[sentenceIndex];

  const orignialSentence = sentence?.original;
  const translation = sentence?.translations[0];

  return (
    <>
      <div className={`${BASE_CLASS}`}>
        <div
          className={`${BASE_CLASS}__edit_button border-right flex jc-around`}
        >
          <Button onClick={() => setWordToEdit(word)} size={ButtonSize.X_SMALL}>
            <FontAwesomeIcon icon={faPencilAlt} size="1x" />
          </Button>
          <Button
            onClick={() => deleteVocabItem(word)}
            size={ButtonSize.X_SMALL}
          >
            <FontAwesomeIcon icon={faTimes} size="1x" />
          </Button>
        </div>
        <div className="border-right padding-5 flex">
          {`${word}${isNotNilOrEmpty(reading) ? ` (${reading})` : ""}`}
        </div>
        {isNilOrEmpty(vocabItem) && (
          <div
            className={`${BASE_CLASS}__loading-indicator border-right padding-5 flex grid-column-3`}
          >
            Loading...
          </div>
        )}

        {isNotNilOrEmpty(vocabItem) && (
          <>
            <div className={`${BASE_CLASS}__cell border-right padding-5 flex`}>
              {definition}
            </div>
            <div
              className={`${BASE_CLASS}__edit_button border-right flex jc-around`}
            >
              <Button
                onClick={() => cycleSentence(word)}
                size={ButtonSize.X_SMALL}
              >
                <FontAwesomeIcon icon={faSyncAlt} size="1x" />
              </Button>
              <Button
                onClick={() => openSentenceInput(word)}
                size={ButtonSize.X_SMALL}
              >
                <FontAwesomeIcon icon={faPencilAlt} size="1x" />
              </Button>
              <Button
                onClick={() => removeSentenceFromVocabItem(word, sentenceIndex)}
                size={ButtonSize.X_SMALL}
              >
                <FontAwesomeIcon icon={faTimes} size="1x" />
              </Button>
            </div>
            <div className="border-right padding-5 flex">
              {orignialSentence}
            </div>
            <div className="border-right padding-5 flex">{translation}</div>
          </>
        )}
      </div>
    </>
  );
};

export default WordsExportItem;
