let todoItemsContainerEle = document.getElementById("todoItemsContainer");
let addTodoButtonEl = document.getElementById("addTodoButton");
let todoUserInputEle = document.getElementById("todoUserInput");
let saveTodoButtonEl = document.getElementById("saveTodoButton");
let selectItemsEle = document.getElementById("selectItems");

let bgContainerEl = document.getElementById("bgContainer");
let toggleBtnEl = document.getElementById("toggleBtn");
let lightHeadingEl = document.getElementById("lightHeading");
let createTaskHeadingEl = document.getElementById("createTaskHeading");
let toggleOffEl = document.getElementById("toggleOff");
let toggleOnEl = document.getElementById("toggleOn");

let isDark = false;


// <------------------------STORAGE PART-------------------------------------->

function getLocalStorageTodoList() {
    let stringifiedItem = localStorage.getItem('todos');
    let parsedTodo = JSON.parse(stringifiedItem);
    /*converts from stringify to original objecy time*/

    if (parsedTodo === null) {
        /*if its no in the localStorage return empty Array*/
        return [];
    } else {
        return parsedTodo;
        /*returns stored array*/
    }
}

let todoList = getLocalStorageTodoList();
console.log(todoList);
let todoCount = todoList.length;

saveTodoButtonEl.onclick = function() {
    localStorage.setItem('todos', JSON.stringify(todoList));
};

// <------------------------STORAGE PART-------------------------------------->


// <--------------------------DELETE PART-------------------------------------->

function onDeleteTodo(todoId) {
    let todoItem = document.getElementById(todoId);
    todoItem.classList.add('delete-anim');
    setTimeout(function() {
        todoItemsContainerEle.removeChild(todoItem);
    }, 800);
    let deleteIndex = todoList.findIndex(function(eachItem) {
        let eachTodoId = 'todo' + eachItem.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
}

// <--------------------------DELETE PART-------------------------------------->


// <--------------------------CREATE, CHECKING PART-------------------------------------->

function checkingStatus(todoId) {
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
    let itemChecked = (todoList[todoObjectIndex]).isChecked;
    return itemChecked;
}

function createAddTodo(todo) {
    let todoId = 'todo' + todo.uniqueNo;

    let createListContainer = document.createElement("li");
    createListContainer.id = todoId;
    createListContainer.classList.add('d-flex', 'flex-row', 'mb-3');
    todoItemsContainerEle.appendChild(createListContainer);

    let pencilIcon = document.createElement("i");
    pencilIcon.classList.add("fa-sharp", "fa-solid", "fa-pencil", "mt-2");
    createListContainer.appendChild(pencilIcon);

    let labelContainerEl = document.createElement("div");
    labelContainerEl.classList.add("d-flex", "flex-row");
    createListContainer.appendChild(labelContainerEl);

    let userTextElement = document.createElement("p");
    let listChecked = checkingStatus(todoId);

    if (listChecked) {
        userTextElement.classList.add('checked');
        createListContainer.classList.add('checked-list-bg');
    } else {
        userTextElement.classList.remove('checked');
        createListContainer.classList.remove('checked-list-bg');
    }

    userTextElement.textContent = todo.text;
    labelContainerEl.appendChild(userTextElement);


    pencilIcon.addEventListener("click", () => {
        pencilIcon.classList.add('pencil-anim');
        setTimeout(function() {
            pencilIcon.classList.remove('pencil-anim');
        }, 600);
        createListContainer.classList.toggle('checked-list-bg');
        userTextElement.classList.toggle('checked');
        if (!todo.isChecked) {
            todo.isChecked = true;
        } else {
            todo.isChecked = false;
        }
    });

    userTextElement.addEventListener("click", () => {
        pencilIcon.classList.add('pencil-anim');
        setTimeout(function() {
            pencilIcon.classList.remove('pencil-anim');
        }, 600);
        createListContainer.classList.toggle('checked-list-bg');
        userTextElement.classList.toggle('checked');
        if (!todo.isChecked) {
            todo.isChecked = true;
        } else {
            todo.isChecked = false;
        }
        console.log(todoList);
    });

    let deleteIconContainer = document.createElement("div");
    labelContainerEl.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icon');
    deleteIconContainer.appendChild(deleteIcon);

    deleteIconContainer.onclick = function() {
        onDeleteTodo(todoId);
    };

    if (isDark) {
        pencilIcon.classList.add('pencil-dark');
        labelContainerEl.classList.add("label-container-dark");
        userTextElement.classList.add("checkbox-label-dark");
        deleteIcon.classList.add('delete-icon-dark');
    } else {
        pencilIcon.classList.add("pencil");
        labelContainerEl.classList.add("label-container");
        userTextElement.classList.add("checkbox-label");
        deleteIcon.classList.add('delete-icon');
    }
}

function createNewTodoObject(todoCount) {
    let newTodo = {
        text: todoUserInputEle.value,
        isChecked: false,
        uniqueNo: todoCount
    };
    todoList.push(newTodo);
    todoUserInputEle.value = "";
    createAddTodo(newTodo);
}

addTodoButtonEl.onclick = function() {
    if (todoUserInputEle.value === "") {
        alert("Please enter task");
        return;
    }
    if (todoCount === 0) {
        todoCount = todoCount + 1;
        createNewTodoObject(todoCount);
    } else if (todoCount >= 0) {
        let todosLastItem = (todoList[todoList.length - 1]);
        let lastUniqueNo = (todosLastItem.uniqueNo);
        todoCount = lastUniqueNo + 1;
        createNewTodoObject(todoCount);
    }
};

//gets from localStorage and iterates
for (let eachItem of todoList) {
    createAddTodo(eachItem);
}

// <--------------------------CREATE, CHECKING PART-------------------------------------->


// <--------------------------SELECT ITEMS PART-------------------------------------->

function showTheCompletedTasks(completedList) {
    todoItemsContainerEle.textContent = "";
    for (let eachItem of completedList) {
        createAddTodo(eachItem);
    }
}

function showThePendingTasks(pendingList) {
    todoItemsContainerEle.textContent = "";
    for (let eachItem of pendingList) {
        createAddTodo(eachItem);
    }
}

function showAllTheTasks(todoList) {
    todoItemsContainerEle.textContent = "";
    for (let eachItem of todoList) {
        createAddTodo(eachItem);
    }
}

function getTheSelectedOptionsList(option) {
    let tasksCompleted = [];
    let tasksPending = [];
    for (let eachItem of todoList) {
        if (eachItem.isChecked === true) {
            tasksCompleted.push(eachItem);
        } else {
            tasksPending.push(eachItem);
        }
    }
    if (option === 'completed') {
        showTheCompletedTasks(tasksCompleted);
    } else if (option === 'pending') {
        showThePendingTasks(tasksPending);
    } else {
        showAllTheTasks(todoList);
    }
}

selectItemsEle.addEventListener("change", (event) => {
    let userSelected = (event.target.value);
    getTheSelectedOptionsList(userSelected);
});

// <--------------------------SELECT ITEMS PART-------------------------------------->


// <--------------------------CHANGING MODE(DARK/LIGHT) PART-------------------------------------->


toggleBtnEl.addEventListener("click", () => {
    isDark = !isDark;

    bgContainerEl.classList.toggle('bg-container');
    bgContainerEl.classList.toggle('bg-container-dark');

    lightHeadingEl.classList.toggle('todos-heading');
    lightHeadingEl.classList.toggle('todos-heading-dark');

    todoUserInputEle.classList.toggle('todo-user-input');
    todoUserInputEle.classList.toggle('todo-user-input-dark');

    addTodoButtonEl.classList.toggle('add-todo-button');
    addTodoButtonEl.classList.toggle('add-todo-button-dark');

    createTaskHeadingEl.classList.toggle('create-task-heading');
    createTaskHeadingEl.classList.toggle('create-task-heading-dark');

    selectItemsEle.classList.toggle('select-items-light');
    selectItemsEle.classList.toggle('select-items-dark');

    saveTodoButtonEl.classList.toggle('add-todo-button-save');
    saveTodoButtonEl.classList.toggle('add-todo-button-save-dark');

    toggleOffEl.classList.toggle('d-none');
    toggleOnEl.classList.toggle('d-none');

    todoItemsContainerEle.textContent = "";
    for (let eachItem of todoList) {
        createAddTodo(eachItem);
    }

});


// <--------------------------CHANGING MODE(DARK/LIGHT) PART-------------------------------------->