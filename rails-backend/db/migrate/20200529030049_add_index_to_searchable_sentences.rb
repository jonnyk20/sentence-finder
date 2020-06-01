class AddIndexToSearchableSentences < ActiveRecord::Migration[5.2]
  disable_ddl_transaction!

  def change
    add_index :sentences, :searchable, using: :gin, algorithm: :concurrently
  end
end
