class AddSearchableColumnToSentences < ActiveRecord::Migration[5.2]
  def up
    execute <<-SQL
      ALTER TABLE sentences
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        (to_tsvector('simple', coalesce(text, ''))) 
      ) STORED;
    SQL
  end

  def down
    remove_column :jobs, :searchable
  end
end
