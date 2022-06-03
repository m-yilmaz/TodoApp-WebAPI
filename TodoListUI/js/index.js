const API_URL = "https://localhost:5001/api/TodoItems";
const $divTodos = $("#todos");
let todos = [];

// Functions

function getTodos() {
    $.ajax({
        type: "GET",
        url: API_URL,
        success: function (data) {
            todos = data;
            $divTodos.html("");
            // $todos.html(JSON.stringify(data));
            for (const index in todos) {
                const item = todos[index];
                $divTodos.append(`
                <div class="d-flex align-items-baseline mb-2 border p-2 rounded" onchange="updateTodo(${index})">
                    <input type="checkbox" id="${item.id}" class="me-2" ${item.isDone ? "checked" : ""}>
                    <span class="me-auto">${item.title}</span>
                    <button class="btn btn-sm btn-danger" onclick="deleteTodo(${item.id})" id="${item.id}"><i class="fa-solid fa-xmark"></i></button>
                </div>
                `);
            }
        }
    });
}

// EVENTS

function updateTodo(index) {
    var todo = todos[index];
    todo.isDone = !todo.isDone;

    $.ajax({
        type: "PUT",
        url: API_URL + "/" + todo.id,
        contentType: "application/json",
        data: JSON.stringify(todo),
        success: function (data) {
            getTodos();
        }
    });
}


function postTodo() {
    const newItem = { id: 0, title: $('#title').val(), isDone: false };

    $.ajax({
        type: "POST",
        url: API_URL,
        contentType: "application/json",
        data: JSON.stringify(newItem),
        success: function (data) {
            $("#title").val("");
            getTodos();
        }
    });
}

$("#frmNewTodo").submit(function (event) {
    event.preventDefault();
    postTodo();

});


function deleteTodo(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: API_URL + "/" + id,
                success: function (data) {
                    getTodos();
                }
            });
        }
      })
    
}


getTodos();