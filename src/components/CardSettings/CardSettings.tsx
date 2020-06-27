import React, { useState, ReactElement, ChangeEvent } from "react";

import CardPreview from "../CardPreview/CardPreview";
import CardOption from "../CardOption/CardOption";
import {
  CardOptionsType,
  CardPlacementType,
  CardPropertyType,
} from "../../constants/cardTypes";
import { VocabItemType } from "../../constants/translationTypes";

import Button from "../Button";
import { exportToAnkiDeck } from "../../utils/exportUtils";
import { isNotNilOrEmpty } from "../../utils/utils";
import { mockVocabItem } from "../../utils/mockData";

import "./CardSettings.scss";

const BASE_CLASS = "card-settings";

type PropsType = {
  vocabItems: Map<string, VocabItemType | null>;
  sentenceIndices: Map<string, number>;
  closeCardSettings: () => void;
};

const CardSettings: React.SFC<PropsType> = ({
  vocabItems,
  sentenceIndices,
  closeCardSettings,
}): ReactElement => {
  const [options, setOptions] = useState<CardOptionsType>({
    [CardPropertyType.SENTENCE]: CardPlacementType.OFF,
    [CardPropertyType.CLOZE_SENTENCE]: CardPlacementType.FRONT,
    [CardPropertyType.SENTENCE_TRANSLATION]: CardPlacementType.OFF,
    [CardPropertyType.WORD]: CardPlacementType.BACK,
    [CardPropertyType.READING]: CardPlacementType.BACK,
    [CardPropertyType.DEFINITION]: CardPlacementType.FRONT,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [deckName, setDeckName] = useState("Language Study");
  const [deckTags, setDeckTags] = useState("");

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

  const firstVocabItem = [...vocabItems.values()].filter(isNotNilOrEmpty)[0];
  console.log("firstVocabItem", firstVocabItem);

  const previewVocabItem = firstVocabItem || mockVocabItem;
  const sentenceIndex = isNotNilOrEmpty(firstVocabItem)
    ? (sentenceIndices.get(firstVocabItem?.word as string) as number)
    : 0;

  const onChangeDeckName = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckName(event.target.value);
  };

  const onChangeDeckTags = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckTags(event.target.value);
  };

  const exportAnki = () => {
    if (isSaving) return;
    setIsSaving(true);
    exportToAnkiDeck(
      vocabItems,
      sentenceIndices,
      options,
      closeCardSettings,
      deckName || "card-maker",
      deckTags
    );
  };

  return (
    <div className={BASE_CLASS}>
      <div
        className={`${BASE_CLASS}__close-button`}
        onClick={closeCardSettings}
      >
        x
      </div>
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
          vocabItem={previewVocabItem}
          sentenceIndex={sentenceIndex}
          options={options}
        />
      </div>
      <div className={`${BASE_CLASS}__deck-name`}>
        <div className="mr-10">Deck Name</div>
        <input value={deckName} onChange={onChangeDeckName} />
      </div>
      <div className={`${BASE_CLASS}__deck-tags`}>
        <div className="mr-10">Tags (comma separated)</div>
        <input value={deckTags} onChange={onChangeDeckTags} />
      </div>
      <div className={`${BASE_CLASS}__save-button pt-10`}>
        <Button onClick={exportAnki}>Save Anki Cards</Button>
      </div>
    </div>
  );
};

export default CardSettings;
