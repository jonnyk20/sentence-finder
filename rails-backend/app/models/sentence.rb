class Sentence < ApplicationRecord
  self.table_name = "Sentences"

  # belongs :translation, class_name: 'Sentence', foreign_key: 'tatoebaId'

  # belongs_to :parent, class_name 'Member'
  # this one worked
  has_many :sentence_translations, class_name: 'SentenceTranslation', foreign_key: 'sentenceId', primary_key: 'tatoebaId'


  def get_translations(language)
    sentence_translations = self.sentence_translations

    translations = sentence_translations
      .map { |s_t| s_t.translation }

    # filtered_translations = translations.select {|s| s.language == language }
    print('translations?')
    print(translations.count)

    {
      sentence: self,
      translations: []# filtered_translations
    }
  end
end
