import React, { ReactElement } from "react";
import { VocabItemType } from "../../constants/translationTypes";
import { CardOptionsType } from "../../constants/cardTypes";
import { isNotNilOrEmpty, renderWithLineBreaks } from "../../utils/utils";
import { generateFlashcardContent } from "../../utils/exportUtils";

import "./CardPreview.scss";

const BASE_CLASS = "card-preview";

type PropsType = {
  vocabItem: VocabItemType | null;
  sentenceIndex: number;
  options: CardOptionsType;
};

const CardPreview: React.SFC<PropsType> = ({
  vocabItem,
  sentenceIndex,
  options,
}): ReactElement => {
  const { frontContent = "", backContent = "" } = isNotNilOrEmpty(vocabItem)
    ? generateFlashcardContent(vocabItem!, sentenceIndex, options)
    : {};

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}__header`}>Card Preview</div>
      <div className={`${BASE_CLASS}__card`}>
        <h4>Front</h4>
        {renderWithLineBreaks(frontContent)}
        <hr />
        <h4>Back</h4>
        {renderWithLineBreaks(backContent)}
      </div>
    </div>
  );
};

export default CardPreview;
