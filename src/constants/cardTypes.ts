export enum CardPropertyType {
  WORD = "word",
  READING = "reading (Japanese)",
  DEFINITION = "definition",
  SENTENCE = "sentence with word showing",
  SENTENCE_TRANSLATION = "sentence translation",
  CLOZE_SENTENCE = "Sentence with word hidden",
}

export enum CardPlacementType {
  FRONT = "front",
  BACK = "back",
  OFF = "off",
}

export type CardOptionsType = { [key in CardPropertyType]: CardPlacementType };
