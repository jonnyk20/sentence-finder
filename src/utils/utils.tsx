import { isNil, isEmpty, either } from 'ramda';
import React, { ReactElement, Fragment } from 'react';

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
      .map((k) => esc(k) + '=' + esc(params[k]))
      .join('&');
    return `?${paramsString}`;
  }

  return '';
};

export const parseQueryString = (s: any): any =>
  s
    .slice(1)
    .split('&')
    .map((queryParam: string) => {
      let pair = queryParam.split('=');
      return { key: pair[0], value: pair[1] };
    })
    .reduce((query: any, pair: any) => {
      pair.key && (query[pair.key] = pair.value);

      return query;
    }, {});

export const isDev = window.location.host.includes('localhost');

export const getRandomIndex = (length: number) =>
  Math.floor(Math.random() * length);

export const getRandomItem = (arr: Array<any>) =>
  arr[getRandomIndex(arr.length)];

export const formatScore = (score: number) =>
  String(score).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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

export const replaceWordWithText = (
  word: string,
  text: string
): ReactElement | string => {
  console.log('word', word);
  console.log('text', text);

  const regex = new RegExp(`${word}([a-zA-Z]*)`, 'gmi');
  return text.replace(regex, '____');
};

export const replaceWordWithElement = (
  word: string,
  text: string
): ReactElement => {
  const regex = new RegExp(`${word}([a-zA-Z]*)`, 'gmi');
  const segments = text
    .split(regex)
    .filter(isNotNilOrEmpty)
    .map((word, i) => <span key={`word-${i}`}>{word}</span>);
  console.log('segments', segments);

  const elements = segments.reduce(
    (acc: ReactElement[], segment: ReactElement, i) => {
      const clozeElement = (
        <span className="cloze" key={i}>
          [---]
        </span>
      );

      console.log('acc', acc);
      console.log('segment', segment.props.children);

      if (i === 0) {
        return [...acc, segment];
      }

      return [...acc, clozeElement, segment];
    },
    []
  );

  return <span>{elements}</span>;
};
