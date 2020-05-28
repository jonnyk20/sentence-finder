class SentenceTranslation < ApplicationRecord
  self.table_name = "SentenceTranslations"

  belongs_to :sentence
  belongs_to :translation, class_name: 'Sentence', foreign_key: 'translationId', primary_key: 'tatoebaId'

  # # this one 
  # has_one :translation, class_name: 'Sentence', foreign_key: 'tatoebaId', primary_key: 'translationId'
end
