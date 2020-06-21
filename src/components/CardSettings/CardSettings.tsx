import React, { useState, ChangeEvent } from "react";

import CardPreview from "../CardPreview/CardPreview";
import "./CardSettings.scss";

const BASE_CLASS = "card-settings";

enum CardPropertyType {
  WORD = "word",
  READING = "reading (Japanese)",
  DEFINITION = "definition",
  SENTENCE = "sentence with word showing",
  SENTENCE_TRANSLATION = "sentence translation",
  CLOZE_SENTENCE = "Sentence with word hidden",
}

// const enym Card = ['word', 'reading (Japanese)', 'definition', 'sentence', 'sentence translation']

enum CardPlacementType {
  FRONT = "front",
  BACK = "back",
  OFF = "off",
}

type CardOptionsType = { [key in CardPropertyType]: CardPlacementType };

const CardSettings = () => {
  const [options, setOptions] = useState<CardOptionsType>({
    [CardPropertyType.SENTENCE]: CardPlacementType.OFF,
    [CardPropertyType.CLOZE_SENTENCE]: CardPlacementType.FRONT,
    [CardPropertyType.SENTENCE_TRANSLATION]: CardPlacementType.OFF,
    [CardPropertyType.WORD]: CardPlacementType.BACK,
    [CardPropertyType.READING]: CardPlacementType.BACK,
    [CardPropertyType.DEFINITION]: CardPlacementType.FRONT,
  });

  const renderOption = ([cardProperty, cardPlacement]: [
    string,
    CardPlacementType
  ]) => (
    <div
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setOptions({
          ...options,
          [cardProperty]: e.target.value,
        });
      }}
      className="flex"
    >
      <div>{cardProperty}: &nbsp;</div>
      <input
        type="radio"
        value={CardPlacementType.FRONT}
        name={cardProperty}
        checked={
          options[cardProperty as CardPropertyType] === CardPlacementType.FRONT
        }
      />
      <input
        type="radio"
        value={CardPlacementType.BACK}
        name={cardProperty}
        checked={
          options[cardProperty as CardPropertyType] === CardPlacementType.BACK
        }
      />
      <input
        type="radio"
        value={CardPlacementType.OFF}
        name={cardProperty}
        checked={
          options[cardProperty as CardPropertyType] === CardPlacementType.OFF
        }
      />
    </div>
  );

  return (
    <div className={BASE_CLASS}>
      <div>x</div>
      <div>Card Export</div>
      <div>{Object.entries(options).map(renderOption)}</div>
      <div>
        <CardPreview />
      </div>
    </div>
  );
};

export default CardSettings;
