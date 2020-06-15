import { isNilOrEmpty } from "./utils"

export type SenseType = {
    english_definitions: Array<string>;
    parts_of_speech: Array<string>;
}

export type JapaneseWordType = {
    word: string;
    reading: string;
}

export type JishoTermType = {
    slug: string;
    tags: Array<string>;
    attribution: {
        dbpedia: string;
        jmdict: boolean;
        dmnedict: boolean;
    },
    is_common: boolean;
    japanese: Array<JapaneseWordType>,
    jlpt: Array<string>;
    senses: Array<SenseType>;
}

export type JishoResponseType = {
    meta: {
        status: number;
    },
    data: Array<JishoTermType>;
}

export type JapaneseTermType = {
    reading: string;
    definitions: Array<string>;
}

export const getJapaneseTerm = (response: JishoResponseType): JapaneseTermType | null => {
    if (isNilOrEmpty(response.data)) return null;

    const rawTermdata = response.data[0];

    const reading = rawTermdata.japanese[0].reading;

    const definitions = rawTermdata.senses[0].english_definitions;

    return {
        reading,
        definitions
    }
}