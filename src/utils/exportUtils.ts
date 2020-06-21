import AnkiExport from "anki-apkg-export";
import Papa from "papaparse";
import { saveAs } from "file-saver";

import { isNotNilOrEmpty, replaceWordWithText } from "./utils";
import { VocabItemType } from "../constants/translationTypes";

export const exportToAnkiDeck = (
  vocabItems: Map<string, VocabItemType | null>,
  sentenceIndices: Map<string, number>,
  onComplete: () => void
) => {
  const deck = new AnkiExport("sentence-finder");
  [...vocabItems.keys()]
    .filter((word) => isNotNilOrEmpty(vocabItems.get(word)))
    .forEach((word) => {
      const vocabItem = vocabItems.get(word);
      const sentenceObject = isNotNilOrEmpty(vocabItem?.sentences)
        ? vocabItem?.sentences![sentenceIndices.get(word) as number]
        : null;
      const originalSentence = sentenceObject?.original || "";
      const sentenceTranslation = sentenceObject?.translations[0];
      const definition = vocabItem?.definition;
      // # Todo, add dictionary definition
      // Todo: bold word and hide in
      deck.addCard(
        `${replaceWordWithText(
          word,
          originalSentence
        )}<br />${sentenceTranslation}${
          isNotNilOrEmpty(definition) ? `<br />(${definition})` : ""
        }`,
        word
      );
    });

  deck
    .save()
    .then((zip: any) => {
      saveAs(zip, "sentence-finder.apkg");
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
