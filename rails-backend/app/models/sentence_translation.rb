class SentenceTranslation < ApplicationRecord
  self.table_name = "SentenceTranslations"

  # this one 
  has_one :translation, class_name: 'Sentence', foreign_key: 'tatoebaId', primary_key: 'translationId'
end
