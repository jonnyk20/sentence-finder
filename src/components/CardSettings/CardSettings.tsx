import React, { useState } from "react";

import CardPreview from "../CardPreview/CardPreview";
import CardOption from "../CardOption/CardOption";
import {
  CardOptionsType,
  CardPlacementType,
  CardPropertyType,
} from "../../constants/cardTypes";
import { VocabItemType } from "../../constants/translationTypes";

import "./CardSettings.scss";

const BASE_CLASS = "card-settings";

const vocabItem: VocabItemType = {
  word: "友達",
  reading: "ともだち",
  definition: "friend, acuquaitance, buddy",
  sentences: [
    {
      original: "彼は僕の友達です",
      translations: ["This is my friend"],
    },
  ],
};

const CardSettings = () => {
  const [options, setOptions] = useState<CardOptionsType>({
    [CardPropertyType.SENTENCE]: CardPlacementType.OFF,
    [CardPropertyType.CLOZE_SENTENCE]: CardPlacementType.FRONT,
    [CardPropertyType.SENTENCE_TRANSLATION]: CardPlacementType.OFF,
    [CardPropertyType.WORD]: CardPlacementType.BACK,
    [CardPropertyType.READING]: CardPlacementType.BACK,
    [CardPropertyType.DEFINITION]: CardPlacementType.FRONT,
  });

  const updateOption = (
    cardProperty: CardPropertyType,
    placement: CardPlacementType
  ) => {
    setOptions({
      ...options,
      [cardProperty]: placement,
    });
  };

  const renderOption = ([cardProperty, cardPlacement]: [
    string,
    CardPlacementType
  ]) => (
    <CardOption
      key={cardProperty}
      updateOption={updateOption}
      cardProperty={cardProperty as CardPropertyType}
      placement={cardPlacement}
    />
  );

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}__close-button`}>x</div>
      <div className={`${BASE_CLASS}__header`}>Card Export</div>
      <div className={`${BASE_CLASS}__options-header`}>
        <div>Option</div>
        <div>Front</div>
        <div>Back</div>
        <div>Off</div>
      </div>
      <div className={`${BASE_CLASS}__options-container`}>
        {Object.entries(options).map(renderOption)}
      </div>
      <div className={`${BASE_CLASS}__card-preview-container`}>
        <CardPreview
          vocabItem={vocabItem}
          sentenceIndex={0}
          options={options}
        />
      </div>
    </div>
  );
};

export default CardSettings;
