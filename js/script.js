// Что необходимо реализовать (первые 2 пункта делаем по видео):

// Дела из localStorage подгружаться должны автоматически при загрузки странице

//  Проверить, чтобы все работало и не было ошибок в консоли (Учесть вариант отсутствия объекта в localstorage пользователя при первой загрузке страницы

'use strict'
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
const getToDoData = function() {
    if (JSON.parse(window.localStorage.getItem('Список дел') === null)) {
        toDoData = [];
    } else {
        toDoData = JSON.parse(window.localStorage.getItem('Список дел'))
    }
}

const render = function() {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    toDoData.forEach(function(item, index) {
        localStorage.setItem('Список дел', JSON.stringify(toDoData));
        
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>'       +         '<div class="todo-buttons">' + 
        '<button class="todo-remove"></button>' + 
        '<button class="todo-complete"></button>' + 
        '</div>'
        if (item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }
        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        })
    })
    
//сломал мозг, но, кажется, победил
    let lists = document.querySelectorAll('.todo-item');
    lists.forEach(function(item, index) {
        removeButton = item.querySelector('.todo-remove')
        const remove = function() {
            console.log('click');
            toDoData.splice(index, 1)
            render()
        }
        removeButton.addEventListener('click', remove)

    })

}




todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    if (headerInput.value == '' || headerInput.value == null) {
        alert('Заполните поле ввода!')
    } else {
        const newToDo = {
            text: headerInput.value,
            completed: false,
        }
    
        toDoData.push(newToDo);
        headerInput.value = '';
    
        render()
    }
})



getToDoData();
render();