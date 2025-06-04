let todos = JSON.parse(localStorage.getItem("todos")) || [];

function simpanData(){
    localStorage.setItem("todos",JSON.stringify(todos));
}

function tampilkanTodo(){
    const list = document.getElementById("todoList");
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${todo.selesai ? "checked" : ""}
            onchange = "toggleSelesai(${index})">
            <span class="${todo.selesai ? 'completed' : ''}">${todo.text}</span>
            <button onclick="hapusTodo(${index})">Delete</button>`;
            list.appendChild(li);
    });
}

function tambahTodo(){
    const input = document.getElementById("todoInput");

    const text = input.value.trim();
    if(text === ""){
        alert("The task cannot be empty!!!");
        return;
    }

    todos.push({text, selesai:false});
    simpanData();
    tampilkanTodo();
    input.value = "";
}

function toggleSelesai(index){
    todos[index].selesai = !todos[index].selesai;
    simpanData();
    tampilkanTodo();
}

function hapusTodo(index){
    todos.splice(index, 1);
    simpanData();
    tampilkanTodo();
}

function hapusSemua(){
    if (confirm("Are you sure you want to delete all tasks?")){
        todos = [];
        simpanData();
        tampilkanTodo();
    }
}

document.getElementById("addBtn").addEventListener("click", tambahTodo);
document.getElementById("clearBtn").addEventListener("click", hapusSemua);
tampilkanTodo();
