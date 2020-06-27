import AnkiExport from "anki-apkg-export";
import Papa from "papaparse";
import { saveAs } from "file-saver";

import { isNotNilOrEmpty, replaceWordWithText, isNilOrEmpty } from "./utils";
import {
  VocabItemType,
  SentenceExampleType,
} from "../constants/translationTypes";
import {
  CardOptionsType,
  CardPlacementType,
  CardPropertyType,
} from "../constants/cardTypes";

export const generateFlashcardContent = (
  vocabItem: VocabItemType,
  sentenceIndex: number,
  options: CardOptionsType
): { frontContent: string; backContent: string } => {
  let frontContent = "";
  let backContent = "";

  const word = vocabItem?.word || "";
  const definition = vocabItem?.definition || "";
  const reading = vocabItem?.reading || "";

  const sentence: SentenceExampleType = isNotNilOrEmpty(vocabItem?.sentences)
    ? (vocabItem?.sentences || [])[sentenceIndex]
    : {
        original: "",
        translations: [""],
      };

  const originalSentence = sentence.original;
  const sentenceWithwordHidden = replaceWordWithText(word, originalSentence);
  const translatedSentence = sentence.translations[0];

  const addToCardByPlacement = (
    string: string,
    placement: CardPlacementType
  ) => {
    console.log(`Adding "${string}" to ${placement}`);
    if (isNilOrEmpty(string)) return;

    switch (placement) {
      case CardPlacementType.FRONT:
        frontContent = `${frontContent}${string}<br />`;
        break;
      case CardPlacementType.BACK:
        backContent = `${backContent}${string}<br />`;
        break;
      default:
        break;
    }
  };

  Object.entries(options).forEach(([key, placement]) => {
    const option = key as CardPropertyType;

    switch (option) {
      case CardPropertyType.WORD:
        addToCardByPlacement(word, placement);
        break;
      case CardPropertyType.CLOZE_SENTENCE:
        addToCardByPlacement(sentenceWithwordHidden, placement);
        break;
      case CardPropertyType.SENTENCE:
        addToCardByPlacement(originalSentence, placement);
        break;
      case CardPropertyType.SENTENCE_TRANSLATION:
        addToCardByPlacement(translatedSentence, placement);
        break;
      case CardPropertyType.DEFINITION:
        addToCardByPlacement(definition, placement);
        break;
      case CardPropertyType.READING:
        addToCardByPlacement(reading, placement);
        break;
      default:
        break;
    }
  });

  return {
    frontContent,
    backContent,
  };
};

const getDeckTagsFromstring = (deckTagsAsString: string): Array<string> =>
  deckTagsAsString
    .split(",")
    .map((s) => s.trim())
    .filter(isNotNilOrEmpty);

export const exportToAnkiDeck = (
  vocabItems: Map<string, VocabItemType | null>,
  sentenceIndices: Map<string, number>,
  options: CardOptionsType,
  onComplete: () => void,
  deckName: string,
  deckTagsAsString: string
) => {
  const deck = new AnkiExport(deckName);
  const tags = getDeckTagsFromstring(deckTagsAsString);
  console.log("tags", tags);

  [...vocabItems.values()].filter(isNotNilOrEmpty).forEach((vocabItem) => {
    const item = vocabItem as VocabItemType;
    const index = sentenceIndices.get(item.word) as number;

    const { frontContent, backContent } = generateFlashcardContent(
      item,
      index,
      options
    );

    deck.addCard(frontContent, backContent, { tags });
  });

  deck
    .save()
    .then((zip: any) => {
      saveAs(zip, `${deckName}.apkg`);
      onComplete();
    })
    .catch((err: any) => console.log(err.stack || err));
};

export const exportToCSV = (
  vocabItems: Map<string, VocabItemType | null>,
  sentenceIndices: Map<string, number>,
  ref: React.RefObject<HTMLAnchorElement>
) => {
  const data = [...vocabItems.keys()]
    .filter((word) => isNotNilOrEmpty(vocabItems.get(word)))
    .map((word) => {
      const vocabItem = vocabItems.get(word);
      const sentenceObject = isNotNilOrEmpty(vocabItem?.sentences)
        ? vocabItem?.sentences![sentenceIndices.get(word) as number]
        : null;
      // const sentence = replaceWordWithText(
      //   word,
      //   sentenceObject?.original!
      // );
      const sentenceTranslation = sentenceObject?.translations[0];
      // # Todo, add dictionary definition
      const originalSentence = sentenceObject?.original || "";

      return {
        word,
        // definition,
        originalSentence,
        sentenceTranslation,
      };
    });
  var csv = Papa.unparse(data);
  var csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = window.URL.createObjectURL(csvData);
  const a = ref.current;
  if (a?.href) {
    a.href = url;
    a.click();
  }
};
