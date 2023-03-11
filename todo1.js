let todoUserInputEle = document.getElementById("todoUserInput");
let addTodoButtonEle = document.getElementById("addTodoButton");
let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");
 
/*used to get the stored array from the localStorage*/
function getLocalStorageTodoList() {
    let stringifiedItem = localStorage.getItem('T1');
    let parsedTodo = JSON.parse(stringifiedItem); /*converts from stringify to original objecy time*/

    if (parsedTodo === null) {
        return []; /*if its no in the localStorage return empty Array*/
    } else {
        return parsedTodo; /*returns stored array*/
    }
}

let todoList = getLocalStorageTodoList();
let todoCount = todoList.length;

/*stores in localStorage with key T1 by stringifing the todoList array*/
saveTodoButton.onclick = function() {
    localStorage.setItem('T1', JSON.stringify(todoList));
}

/*deletes specific object from todoList using splice */
function onDeleteTodoItem(todoId) {
    let deletingItem = document.getElementById(todoId); /*gets specific Object using todoId*/
    todoItemsContainerEl.removeChild(deletingItem);
    let deleteIndex = todoList.findIndex(function(eachItem) {
        /*finds the index in todoList*/
        let eachTodoId = "todo" + eachItem.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    }); /*gets the id of Object in todoList*/
    todoList.splice(deleteIndex, 1);
}

/*used to change the status of the checkbox and label*/
function checkingTheStatus(checkboxId, labelId, todoId) {
    let checkBox = document.getElementById(checkboxId);
    let label = document.getElementById(labelId);

    label.classList.toggle('checked'); /*if it's already true changes to false visversa*/
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        /*testing function iterates eachTodo in todoList
            if the ID found then returns index of the item*/
        let eachTodoId = 'todo' + eachTodo.uniqueNo; /*(todoId)todo1,todo2....etc*/
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex]; /*picks the specific object from todoList*/

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

/*used to take values from the newtodo(usersInput) and add to todoItemsContainerEl(my tasks)*/
function createAddTodoList(todo) {
    let todoId = 'todo' + todo.uniqueNo;
    /*creating objectId used for onDeleteTodoItem(todoId) 
        and checkingTheStatus to check the specific object for deleting or checking */
    let checkboxId = 'checkbox' + todo.uniqueNo;
    /*creating uniqueId for checkbox and used for 
        checkingTheStatus to identify inputEl*/
    let labelId = 'label' + todo.uniqueNo;
    /*creating uniqueId for label and used for 
        checkingTheStatus to identify labelElement*/

    let createList = document.createElement('li');
    createList.id = todoId;
    createList.classList.add('d-flex', 'flex-row', 'list-styles'); /*to arrange inputEl and labelContainerEl in a row*/
    todoItemsContainerEl.appendChild(createList); /*adding <li> to <ul>(todoItemsContainerEl)*/

    let inputEl = document.createElement('input');
    inputEl.type = 'checkbox';
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked; /*inputEl.checked gives the status of checkbox ticked or not*/
    /*todoisChecked gives true or false wheather the list is checked or not*/

    inputEl.onclick = function() {
        checkingTheStatus(checkboxId, labelId, todoId);
    };
    inputEl.classList.add('checkbox-input');
    createList.appendChild(inputEl); /*appends to <li>*/

    let labelContainerEl = document.createElement('div');
    labelContainerEl.classList.add('d-flex', 'flex-row');
    labelContainerEl.classList.add('label-container');
    createList.appendChild(labelContainerEl);

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', checkboxId); /*setAttribute method to set any html arttribute name and its corresponding value*/
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelElement.classList.add('checkbox-label');

    if (todo.isChecked === true) {
        /*checks from the given todoitem checks if true else remove*/
        labelElement.classList.add('checked');
    } else {
        labelElement.classList.remove('checked');
        todo.isChecked = false;
    }
    labelContainerEl.appendChild(labelElement); /*apppend to labelContainerEl<div> which is in <li>*/


    let delImgContainer = document.createElement('div');
    labelContainerEl.appendChild(delImgContainer);

    let deleteImgEl = document.createElement('i');
    deleteImgEl.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteImgEl.onclick = function() {
        onDeleteTodoItem(todoId);
    };
    delImgContainer.appendChild(deleteImgEl);
}

/*taking value from todoUserInputEle and adding to the todoList*/
function onAddTodoElement() {
    /*if todoUserInputEle.value is empty then is gives a alert*/
    if (todoUserInputEle.value === "") {
        alert('Enter a text');
        return;
    } /*else it creates newtodo and increases the todoCount by 1*/
    todoCount = todoCount + 1;
    let newTodo = {
        text: todoUserInputEle.value,
        uniqueNo: todoCount,
        isChecked: false
    };
    /*passing newTodo as argument to createAddTodoList*/
    createAddTodoList(newTodo);
    /*newTodo is added to the todoList array*/
    todoList.push(newTodo);
    /*returns the input value empty after adding*/
    todoUserInputEle.value = "";
}

/*iterating each item in todoList array*/
for (let item of todoList) {
    createAddTodoList(item);
}

/*adds each Object to the todoList*/
addTodoButtonEle.onclick = function() {
    onAddTodoElement();
};