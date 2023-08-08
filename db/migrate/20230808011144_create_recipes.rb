class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :description
      t.integer :user_id
      t.integer :meal_id

      t.timestamps
    end
  end
end
