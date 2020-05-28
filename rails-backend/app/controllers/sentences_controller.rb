class SentencesController < ApplicationController
  def search
    sentences = Sentence.where('language=:language AND (text LIKE :query)', { query: '% test %', language: 'fra' })

    res = {
      word: 'test',
      sentences: sentences.map { |s| s.get_translations("eng") }
    }

    json_response(res)
  end
end
