class Sentence < ApplicationRecord
  include PgSearch::Model

  # pg_search_scope :search_text,
  #                 against: %i[text],
  #                 using: {
  #                   tsearch: {
  #                     tsvector_column: 'searchable'
  #                   }
  #                 }

  # include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  include Elasticsearch::Model

  has_many :sentence_translations, class_name: 'SentenceTranslation', foreign_key: 'sentenceId', primary_key: 'tatoebaId'
  has_many :translations, :through => :sentence_translations

  # settings index: { number_of_shards: 1 } do
  #   mappings dynamic: 'false' do
  #     indexes :text, analyzer: 'english', index_options: 'offsets'
  #   end
  # end


  def as_indexed_json(options = {})
    self.as_json(
      only: [:text]
    )
  end  

  def get_translations(language)

    filtered_translations = self.translations.select {|s| s.language == language }

    {
      sentence: self,
      translations: filtered_translations
    }
  end
end
