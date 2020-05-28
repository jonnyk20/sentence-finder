class CreateSentences < ActiveRecord::Migration[5.2]
  def change
    create_table :sentences do |t|
      t.text :text
      t.string :createdAt
      t.string :updatedAt
      t.string :language
      t.integer :tatoebaId

      t.timestamps
    end
  end
end
