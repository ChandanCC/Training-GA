function Controller() {
  this.model = new model();
  this.addTodo = function(caption, isCompleted) {
    this.model.addTodo(caption, isCompleted);
  };

  this.attachEventListener = function() {
    var self = this;

    var inBox = document.getElementById("in-box");

    inBox.onkeypress = function(event) {
      if (event.keyCode == 13) {
        if (inBox.value != "") {
          self.addTodo(inBox.value, false);
          self.render();

          inBox.value = "";
        }
      }
    };
  };

  this.render = function() {
    this.attachEventListener();

    var self = this;
    var list = document.getElementById("todos");
    list.innerHTML = "";

    for (var i = 0; i < this.model.todoCollection.length; i++) {
      var todoitem = this.model.todoCollection[i];
      var li = document.createElement("li");
      li.setAttribute("class", "list bg-white");
      li.onmouseenter = function(event) {
        event.target.lastElementChild.style.display = "block";
      };
      li.onmouseleave = function(event) {
        event.target.lastElementChild.style.display = "none";
      };

      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.setAttribute("class", "status");
      if (todoitem.isCompleted) {
        cb.setAttribute("checked", "true");
      }
      cb.onclick = function(index, event) {
        self.model.toggle(index);
        self.render();
      }.bind(null, i);

      li.appendChild(cb);

      var sp = document.createElement("span");
      sp.innerHTML = todoitem.caption;
      sp.setAttribute("class", "title");
      if (todoitem.isCompleted) {
        sp.classList.add("class", "striked");
      }
      sp.ondblclick = function(event) {
        var trgt = event.target;
        trgt.style.display = "none";
        var ip = trgt.parentNode.childNodes[2];
        ip.style.display = "block";
        ip.focus();
      };

      li.appendChild(sp);

      var iph = document.createElement("input");
      iph.type = "text";
      iph.value = todoitem.caption;
      iph.style.display = "none";
      iph.style.flex = "1";
      iph.setAttribute("class", "hidden-ip-box");
      iph.onkeypress = function(index, event) {
        var x = event.target;
        if (event.keyCode == 13) {
          if (x.value == "") {
            self.model.removeTodo(index);
          } else {
            self.model.editTodo(index, x.value);
          }
          self.render();
        }
      }.bind(null, i);
      iph.onblur = function(index, event) {
        var newValue = event.target.value;
        //console.log(event.target);
        if (newValue != "") {
          self.model.editTodo(index, newValue);
        } else {
          self.model.removeTodo(index);
        }
        self.render();
      }.bind(null, i);

      li.appendChild(iph);

      var sp = document.createElement("span");
      sp.innerHTML = "X";
      sp.setAttribute("class", "cross");
      sp.onclick = function(index, event) {
        self.model.removeTodo(index);
        self.render();
      }.bind(null, i);

      li.appendChild(sp);

      list.appendChild(li);
    }
  };
}
