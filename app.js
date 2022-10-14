const addButton = document.querySelector(".btn-primary");
const taskTitle = document.querySelector("[name='name']");
const taskDescription = document.querySelector("[name='description']");
const taskArea = document.querySelector(".tasks-container");

// primero leo el local storage para guardar los valores en el arreglo y luego seguir agregando tareas

// getItem obtiene una propiedad del local Storage y si es un []u{} tenemos que parsearlo con
// JSON.parse(valor)

// https://todoemlo.onrender.com/todo/tasks

const url = "https://todoemlo.onrender.com/todo/tasks";

getTasks();

taskArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    // lo único que necesitamos para eliminar una tarea
    // es el id
    const taskId = e.target.getAttribute("id");
    //const newTasks = tasksArray.filter((task) => task.id !== Number(taskId));
    //tasksArray = [...newTasks];
    //createTask();
    deleteTask({ id: taskId });
  }
  if (e.target.classList.contains("btn-complete")) {
    const taskId = e.target.getAttribute("id");
    // const index = tasksArray.findIndex((task) => task.id === Number(taskId));
    // tasksArray[index].complete = true;
    // createTask();
    updateTask(taskId);
  }
});

addButton.addEventListener("click", (e) => {
  const title = taskTitle.value;
  const description = taskDescription.value;

  const data = { title, description, status: false };

  if (title === "") {
    alert("necesitas poner un titulo a tu tarea");
  }

  if (description === "") {
    alert("necesitas agregar una descripción a la tarea");
  }

  if (title !== "" && description !== "") {
    createNewTask(data);
  }

  // la nueva petición hay que hacerla cuando el servidor haya creado la nueva tarea

  clearInputs();
});

function createTask(arr) {
  const elements = arr.map((task) => {
    return `
      <div class="task-item">
        <div class="task-description">
          <h3 class="${task.status ? "complete" : ""}">${task.title}</h3>
          <p>${task.description}</p>
        </div>
        <div class="task-buttons">
          <button class="btn btn-complete ${task.status ? "hide" : ""}" id=${
      task.id
    }>Completar</button>
          <button class="btn btn-delete" id=${task.id}>Delete</button>
        </div>
      </div>`;
  });
  taskArea.innerHTML = elements.join("");
}

function clearInputs() {
  taskTitle.value = "";
  taskDescription.value = "";
}

function getTasks() {
  fetch(url, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      createTask(data);
    });
}

function createNewTask(data) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => getTasks());
}

function deleteTask(id) {
  fetch(url, {
    method: "DELETE",
    body: JSON.stringify(id),
    headers: {
      "Content-type": "application/json",
    },
  }).then(() => getTasks());
}

// para el update necesitamos id de la tarea a actulizar y el valor a actualizar
// { status: true }

function updateTask(id) {
  const data = { id, status: true };
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  }).then(() => getTasks());
}

// localStorage.setItem("prueba", JSON.stringify({ propiedad: "sñadlkfhadsfak" }));
// valores primitivos
// para enviar {} o [] usamos JSON.stringify(valor);
