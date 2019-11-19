// query selector to access values and set values
var insertBtn = document.querySelector('#insert');
var toDoList = document.querySelector('ul#toDoList');
var completedtoDoList = document.querySelector('ul#completed');

var synth = window.speechSynthesis;
var sound = "ding";

function speakNow(string) {
	var utterThis = new SpeechSynthesisUtterance(string);
	synth.speak(utterThis);
}


// add new item in to-do list
insertBtn.onclick = function(){

  var enter = document.querySelector('#enter');

  // create new list element for adding new item
  var li = document.createElement('li');
  li.setAttribute('class', 'group-item');

  // to get inserted value
  var itemValue = enter.value;
  console.log(itemValue);

  li.innerHTML = itemValue;

  // creating a checkBox element
	var checkBox = document.createElement('input');

  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('id', 'check');
  checkBox.setAttribute('style', 'float: left;');

  li.appendChild(checkBox);

  checkBox.onchange = function(){
    // speak ding sound when checkbox is checked
    speakNow(sound);
    var completedLi = document.createElement('li');
    li.removeChild(checkBox);

    // take text value and convert it into string
    var itemStringValue = li.innerText.toString();
    var completedItemValue = li.innerText.toString().substr(0, itemStringValue.length - 6);
    completedLi.innerText = completedItemValue;

    // create a delete button to delete tasks
    var deleteButtonCompleted = document.createElement('button');
    deleteButtonCompleted.innerText = "Delete";
    deleteButtonCompleted.setAttribute('id', 'deleteCompleted');
    completedLi.appendChild(deleteButtonCompleted);

    // event listener for completed tasks delete button
    deleteButtonCompleted.onclick = function(){
      completedtoDoList.removeChild(completedLi);
    }

    //css for completed tasks
    completedLi.setAttribute('style','background-color: rgb(102, 255, 102);margin-bottom: 15px;text-Decoration: line-through;');

    completedtoDoList.appendChild(completedLi);

    //remove child from to-do list
    toDoList.removeChild(li);
  }

  //add delete button
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = "Delete";
  deleteButton.setAttribute('id', 'delete');
  deleteButton.setAttribute('style', 'float: right;')
  li.appendChild(deleteButton);

  // event handler for delete button
  deleteButton.onclick = function(){
    li.style.display = 'none';
  }

	// if text field is empty
  if(itemValue === ''){
    // shows alert message
    alert("It is important to add value for to-do list");
  }
  else{
    toDoList.appendChild(li);
  }
  //after adding value to to-do list, remove it from the input field.
  enter.value = "";
}
