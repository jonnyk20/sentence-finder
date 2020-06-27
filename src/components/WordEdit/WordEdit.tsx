import React, { ReactElement, useState, ChangeEvent } from "react";

import "./WordEdit.scss";
import Button from "../Button";
import { VocabItemType } from "../../constants/translationTypes";

type PropsType = {
  removeWordToEdit: () => void;
  editWord: (
    originalSpelling: string,
    spelling: string,
    reading: string,
    definition: string
  ) => void;
  vocabItem: VocabItemType;
};

const BASE_CLASS = "word-edit";

const WordEdit: React.SFC<PropsType> = ({
  removeWordToEdit,
  editWord,
  vocabItem,
}): ReactElement => {
  const {
    word: orignalWord,
    reading: originalReading,
    definition: originalDefinition,
  } = vocabItem;

  const [word, setWord] = useState(orignalWord);
  const [reading, setReading] = useState(originalReading || "");
  const [definition, setDefinition] = useState(originalDefinition || "");

  const onChangeWord = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const onChangeReading = (event: ChangeEvent<HTMLInputElement>) => {
    setReading(event.target.value);
  };
  const onChangeDefinition = (event: ChangeEvent<HTMLInputElement>) => {
    setDefinition(event.target.value);
  };

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}__close-button`} onClick={removeWordToEdit}>
        x
      </div>
      <div>Word Edit</div>
      <div className={`${BASE_CLASS}__input`}>
        <label>Spelling</label>
        <input value={word} onChange={onChangeWord} />
      </div>
      <div className={`${BASE_CLASS}__input`}>
        <label>Pronunciation</label>
        <input value={reading} onChange={onChangeReading} />
      </div>
      <div className={`${BASE_CLASS}__input`}>
        <label>Definition</label>
        <input value={definition} onChange={onChangeDefinition} />
      </div>
      <div>
        <Button
          onClick={() => {
            editWord(orignalWord, word, reading, definition);
            removeWordToEdit();
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default WordEdit;
