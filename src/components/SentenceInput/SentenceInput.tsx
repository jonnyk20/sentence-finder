import React, { ReactElement, useState, ChangeEvent } from "react";

import "./SentenceInput.scss";
import { SentenceExampleType } from "../../constants/translationTypes";
import Button from "../Button";

const BASE_CLASS = "sentence-input";

type PropsType = {
  word: string;
  addSentence: (word: string, setence: SentenceExampleType) => void;
  closeSentenceInput: () => void;
};

const SentenceInput: React.SFC<PropsType> = ({
  word,
  addSentence,
  closeSentenceInput,
}): ReactElement => {
  const [sentence, setSentence] = useState("");
  const [translation, setTranslation] = useState("");

  const onAddSentence = () => {
    const sentenceExample: SentenceExampleType = {
      original: sentence,
      translations: [translation],
    };

    addSentence(word, sentenceExample);
  };

  const onChangeSentence = (event: ChangeEvent<HTMLInputElement>) => {
    setSentence(event.target.value);
  };

  const onChangeTranslation = (event: ChangeEvent<HTMLInputElement>) => {
    setTranslation(event.target.value);
  };

  return (
    <div className={BASE_CLASS}>
      <div
        className={`${BASE_CLASS}__close-button`}
        onClick={closeSentenceInput}
      >
        x
      </div>
      <h2>Add Sentence for "{word}"</h2>
      <div className="mb-10">
        <div className="mb-10">Sentence</div>
        <input onChange={onChangeSentence} value={sentence} />
      </div>
      <div className="mb-10">
        <div className="mb-10">Translation (Optional)</div>
        <input onChange={onChangeTranslation} value={translation} />
      </div>
      <Button onClick={onAddSentence}>Add Sentence</Button>
    </div>
  );
};

export default SentenceInput;
