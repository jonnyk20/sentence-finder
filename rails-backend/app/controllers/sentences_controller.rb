class SentencesController < ApplicationController
  def search
    # sentences = Sentence.where('language=:language AND (text LIKE :query)', { query: '% test %', language: 'fra' })

    # sentences = Sentence.search('test').records.where( { language: 'fra'})

    word = params[:word]
    language_from = params[:language_from]
    language_to = params[:language_to]

    sentences = Sentence.search(word).records.where({ language: language_from })
    vocab_item = {
      word: word,
      sentences: sentences.map { |s| s.get_translations(language_to) }
    }


    res = {
      vocab_item: vocab_item
    }

    json_response(res)
  end
end
