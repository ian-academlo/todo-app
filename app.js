const addButton = document.querySelector(".btn-primary");
const taskTitle = document.querySelector("[name='name']");
const taskDescription = document.querySelector("[name='description']");
const taskArea = document.querySelector(".tasks-container");

// primero leo el local storage para guardar los valores en el arreglo y luego seguir agregando tareas

// getItem obtiene una propiedad del local Storage y si es un []u{} tenemos que parsearlo con
// JSON.parse(valor)

let tasksArray = JSON.parse(localStorage.getItem("tasks")) ?? []; // devuelv e el primer v o el ultimo f
// nullish coalesing ??
// si el valor de la izquierda es null o undefined devuelve el valor de la derecha
// si no ---> devuelve el valor de la izquierda
createTask();
let idCounter = 0;

// Event Delegation
// asignar un identificador unico a cada tarea

taskArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const taskId = e.target.getAttribute("id");
    // splice -- primero necesito encontrar la posición del elemento y liego aplicar splice
    // con un filter
    const newTasks = tasksArray.filter((task) => task.id !== Number(taskId));
    tasksArray = [...newTasks];
    createTask();
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
  if (e.target.classList.contains("btn-complete")) {
    const taskId = e.target.getAttribute("id");
    // encontrar el indice del elemento que tenga el id que acabo de obtener
    const index = tasksArray.findIndex((task) => task.id === Number(taskId));
    // en el arreglo modifico la propiedad complete del elemento encontrado
    tasksArray[index].complete = true;
    createTask();
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
});

addButton.addEventListener("click", (e) => {
  // console.log(
  //   e.target.parentElement.previousElementSibling.firstElementChild
  //     .lastElementChild.value
  // );
  const title = taskTitle.value;
  const description = taskDescription.value;
  console.log(title, description);
  tasksArray.push({ title, description, complete: false, id: idCounter });
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  clearInputs();
  createTask();
  idCounter++;
});

function createTask() {
  const elements = tasksArray.map((task) => {
    return `
      <div class="task-item">
        <div class="task-description">
          <h3 class="${task.complete ? "complete" : ""}">${task.title}</h3>
          <p>${task.description}</p>
        </div>
        <div class="task-buttons">
          <button class="btn btn-complete ${task.complete ? "hide" : ""}" id=${
      task.id
    }>Competar</button>
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

localStorage.setItem("prueba", JSON.stringify({ propiedad: "sñadlkfhadsfak" }));
// valores primitivos
// para enviar {} o [] usamos JSON.stringify(valor);
