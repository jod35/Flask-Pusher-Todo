//makes an api call to add an item
function addItem(e){
    if(e.which==13 || e.keyCode ==13){
        let item =document.querySelector('.new-todo');

        fetch(
            '/add-todo',
            {
                method:'post',
                body:JSON.stringify(
                    {
                        id:`item-${Date.now}`,
                        value:item.value,
                        completed:0
                    }
                )
            }
        ).then(resp=>{
            //empty form input once a response is received
            item.value = ""
        });
    }
}

//removing a todo item

function removeItem(id){
    fetch(`/remove-todo/${id}`);
}

 // function that makes API call to update an item 
// toggles the state of the item between complete and
// incomplete states
function toggleComplete(elem) {
    let id = elem.dataset.id,
        completed = (elem.dataset.completed == "1" ? "0" : "1");
    fetch(`/update-todo/${id}`, {
        method: 'post',
        body: JSON.stringify({ completed })
    });
}

// helper function to append new ToDo item to current ToDo list
function appendToList(data) {
    let html = `
        <li id="${data.id}">
        <div class="view">
            <input class="toggle" type="checkbox" onclick="toggleComplete(this)" 
            data-completed="${data.completed}" data-id="${data.id}">
            <label>${data.value}</label>
            <button class="destroy" onclick="removeItem('${data.id}')"></button>
        </div>
        </li>`;
    let list = document.querySelector(".todo-list");
    list.innerHTML += html;
};