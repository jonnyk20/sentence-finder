import { isNil, isEmpty, either } from "ramda";
import React, { ReactElement } from "react";
import {
  LanguageCodes,
  LingueeLanguageCodeType,
} from "../constants/translationTypes";

export const isNilOrEmpty = either(isNil, isEmpty);

export const isNotNilOrEmpty = (arg: any) => !isNilOrEmpty(arg);

export const wait = async (delay: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
};

export const encodeQueryString = (params: any) => {
  const keys: string[] = Object.keys(params);

  if (!isNilOrEmpty(keys)) {
    var esc = encodeURIComponent;
    const paramsString = Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&");
    return `?${paramsString}`;
  }

  return "";
};

export const parseQueryString = (s: any): any =>
  s
    .slice(1)
    .split("&")
    .map((queryParam: string) => {
      let pair = queryParam.split("=");
      return { key: pair[0], value: pair[1] };
    })
    .reduce((query: any, pair: any) => {
      pair.key && (query[pair.key] = pair.value);

      return query;
    }, {});

export const getRandomIndex = (length: number) =>
  Math.floor(Math.random() * length);

export const getRandomItem = (arr: Array<any>) =>
  arr[getRandomIndex(arr.length)];

export const formatScore = (score: number) =>
  String(score).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const shuffle = (a: Array<any>): Array<any> => {
  const shuffled = [...a];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const pluralize = (
  count: number,
  singular: string,
  plural: string
): string => (count === 1 ? singular : plural);

export const replaceWordWithText = (word: string, text: string): string => {
  const regex = new RegExp(`${word}([a-zA-Z]*)`, "gmi");
  return text.replace(regex, "____");
};

export const replaceWordWithElement = (
  word: string,
  text: string
): ReactElement => {
  const regex = new RegExp(`${word}([a-zA-Z]*)`, "gmi");
  const segments = text
    .split(regex)
    .filter(isNotNilOrEmpty)
    .map((word, i) => <span key={`word-${i}`}>{word}</span>);

  const elements = segments.reduce(
    (acc: ReactElement[], segment: ReactElement, i) => {
      const clozeElement = (
        <span className="cloze" key={i}>
          [---]
        </span>
      );

      if (i === 0) {
        return [...acc, segment];
      }

      return [...acc, clozeElement, segment];
    },
    []
  );

  return <span>{elements}</span>;
};

export const convertToLingueeLanguageCode = (
  code: LanguageCodes
): LingueeLanguageCodeType => {
  switch (code) {
    case LanguageCodes.EN:
      return LingueeLanguageCodeType.EN;
    case LanguageCodes.FR:
      return LingueeLanguageCodeType.FR;
    case LanguageCodes.SP:
      return LingueeLanguageCodeType.SP;
    case LanguageCodes.JA:
      return LingueeLanguageCodeType.JA;
    default:
      return LingueeLanguageCodeType.EN;
  }
};

export const renderWithLineBreaks = (
  str: string
): Array<ReactElement | string> => {
  const output: Array<ReactElement | string> = [];
  const elements = str.split(/<br \/>/g);

  elements.filter(isNotNilOrEmpty).forEach((el, i) => {
    const isLast = i === el.length - 1;

    if (isNotNilOrEmpty(el)) {
      output.push(el);
    }

    if (!isLast) {
      output.push(<br key={el} />);
    }
  });

  return output;
};

export const isDev = (): boolean => process.env.NODE_ENV === "development";
