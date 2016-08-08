class TodosController < ApplicationController
  def index
    @todos = Todo.all

    if request.xhr?
      render :json => { todos: @todos }
    else
      renderHTML todos: @todos
    end
  end

  def show
    @todo = Todo.find(params[:id])

    if request.xhr?
      render :json => { todo: @todo }
    else
      renderHTML todo: @todo
    end
  end

  def create
    @todo = Todo.new(:todo => params[:todo],
                     :completed => parse_boolean(params[:completed]))
    if @todo.save
      render :json => { todo: @todo }
    else
      render :json => { errors: @todo.errors }
    end
  end

  def update
    @todo = Todo.find(params[:id])

    if @todo.update(todo_params)
      render :json => { todo: @todo }
    else
      render :json => { errors: @todo.errors }
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy

    render :json => { todo: @todo }
  end

  private
    def parse_boolean(param)
      ActiveRecord::Type::Boolean.new.deserialize(param)
    end

    def todo_params
      params.permit(:todo, :completed)
    end
end
