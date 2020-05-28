class CreateSentenceTranslations < ActiveRecord::Migration[5.2]
  def change
    create_table :sentence_translations do |t|
      t.string :createdAt
      t.string :updatedAt
      t.integer :sentenceId
      t.integer :translationId

      t.timestamps
    end
  end
end
