class Todo < ApplicationRecord
  validates :todo, presence: true
end
