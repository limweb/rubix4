class CreateTodos < ActiveRecord::Migration[5.0]
  def change
    create_table :todos do |t|
      t.text :todo
      t.boolean :completed

      t.timestamps
    end
  end
end
