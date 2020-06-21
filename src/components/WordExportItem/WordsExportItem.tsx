import React, { ReactElement } from "react";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
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
};

const WordsExportItem: React.SFC<PropsType> = ({
  vocabItem,
  sentenceIndices,
  cycleSentence,
}): ReactElement => {
  const { word = "", sentences, reading, definition } = vocabItem || {};
  const sentence = sentences?.[sentenceIndices.get(word) as number];

  const orignialSentence = sentence?.original;
  const translation = sentence?.translations[0];

  return (
    <div className={`${BASE_CLASS}`}>
      <div className="border-right padding-5 flex">{`${word}${
        isNotNilOrEmpty(reading) ? ` (${reading})` : ""
      }`}</div>
      {isNilOrEmpty(vocabItem) && (
        <div
          className={`${BASE_CLASS}__loading-indicator border-right padding-5 flex grid-column-3`}
        >
          Loading...
        </div>
      )}

      {isNotNilOrEmpty(vocabItem) && (
        <>
          <div className="border-right padding-5 flex">{definition}</div>
          <div className="border-right padding-5 flex">{orignialSentence}</div>
          <div className="border-right padding-5 flex">{translation}</div>
          <div className="padding-5 flex fd-column jc-around">
            <Button onClick={() => cycleSentence(word)} size={ButtonSize.SMALL}>
              <FontAwesomeIcon icon={faSyncAlt} size="1x" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default WordsExportItem;
