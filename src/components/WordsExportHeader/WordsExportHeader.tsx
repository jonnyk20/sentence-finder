import React, { ReactElement } from "react";

import "./WordsExportHeader.scss";

const BASE_CLASS = "words-export-header";

const WordsExportHeader: React.SFC = (): ReactElement => (
  <div className={BASE_CLASS}>
    <div className={`${BASE_CLASS}__level-1`}>
      <div className={`${BASE_CLASS}__word padding-5`}>Word</div>
      <div className={`${BASE_CLASS}__sentence padding-5`}>Sentence</div>
    </div>
    <div className={`${BASE_CLASS}__level-2`}>
      <div className={`${BASE_CLASS} padding-5`}>Edit</div>
      <div className={`${BASE_CLASS} padding-5`}>Spelling</div>
      <div className={`${BASE_CLASS} padding-5`}>Definition</div>
      <div className={`${BASE_CLASS} padding-5`}>Edit</div>
      <div className={`${BASE_CLASS} padding-5`}>Original</div>
      <div className={`${BASE_CLASS} padding-5`}>Translated</div>
    </div>
  </div>
);

export default WordsExportHeader;
