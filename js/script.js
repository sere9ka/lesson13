'use strict';

const headerInput =  document.querySelector('.header-input');
const todoControl = document.querySelector('.todo-control');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoItem = document.querySelector('.todo-item');
const textTodo = document.querySelector('.text-todo');
const clearButton = document.querySelector('.clear');
let removeButton;
let toDoData = [];

// localStorage.clear();

const start = function() {
    getToDoData();
    render();
};

const getToDoData = function() {
    if (JSON.parse(window.localStorage.getItem('Список дел') === null)) {
        toDoData = [];
    } else {
        toDoData = JSON.parse(window.localStorage.getItem('Список дел'));
    }
};

const render = function() {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    toDoData.forEach(function(item, index) {
        localStorage.setItem('Список дел', JSON.stringify(toDoData));
        
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +  '<div class="todo-buttons">' + '<button class="todo-remove"></button>' +     '<button class="todo-complete"></button>' + '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });
        removeButton = li.querySelector('.todo-remove');
        removeButton.addEventListener('click', function() {
                remove(item, index);
        });
    });
//сломал мозг, но, кажется, победил
};

const remove = function(item, index) {
    if (toDoData.length > 1) {
        console.log('Удаляем задачу: ' + item.text);
        console.log(toDoData);
        toDoData.splice(index, 1);
        console.log(toDoData);
        localStorage.removeItem(item.text);
        render();
    } else {
        console.log('Удаляем все задачи');
        localStorage.clear()
        start()
    }
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    if (headerInput.value == '' || headerInput.value == null) {
        alert('Заполните поле ввода!');
    } else {
        const newToDo = {
            text: headerInput.value,
            completed: false,
        };
    
        toDoData.push(newToDo);
        headerInput.value = '';
    
        render();
    }
});

start();