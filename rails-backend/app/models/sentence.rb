class Sentence < ApplicationRecord
  self.table_name = "Sentences"

  has_many :sentence_translations, class_name: 'SentenceTranslation', foreign_key: 'sentenceId', primary_key: 'tatoebaId'
  has_many :translations, :through => :sentence_translations

  def get_translations(language)

    filtered_translations = self.translations.select {|s| s.language == language }

    {
      sentence: self,
      translations: filtered_translations
    }
  end
end
