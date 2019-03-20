function TodoItem(caption, isCompleted) {
  this.caption = caption;
  this.isCompleted = isCompleted;

  this.toggle = function() {
    this.isCompleted = !this.isCompleted;
  };
}

function model() {
  this.todoCollection = [];

  this.addTodo = function(caption, isCompleted) {
    var todo = new TodoItem(caption, isCompleted);
    this.todoCollection.push(todo);
  };

  this.removeTodo = function(index) {
    this.todoCollection.splice(index, 1);
  };

  this.toggle = function(index) {
    this.todoCollection[index].toggle();
  };

  this.editTodo = function(index, newCaption) {
    //console.log(newCaption);
    this.todoCollection[index].caption = newCaption;
  };
}
