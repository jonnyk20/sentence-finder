class SentenceTranslation < ApplicationRecord
  belongs_to :sentence, foreign_key: 'sentenceId', primary_key: 'tatoebaId'
  belongs_to :translation, class_name: 'Sentence', foreign_key: 'translationId', primary_key: 'tatoebaId'

  # # this one 
  # has_one :translation, class_name: 'Sentence', foreign_key: 'tatoebaId', primary_key: 'translationId'
end
