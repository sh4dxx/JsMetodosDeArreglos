const btnAddTask = document.getElementById("btnAddTask");
const inputText = document.getElementById("inputText");
const divLabels = document.getElementById("labels");
const tableBody = document.getElementById("table-body");
const divError = document.getElementById("divError");

const taskList = [
    { id: 1, descripcion: "Hacer las compras del finde", completado: true },
    { id: 2, descripcion: "Realizar el desafio latam, metodos de arrays", completado: true },
    { id: 3, descripcion: "Salir en bicicleta", completado: false },
];

btnAddTask.addEventListener("click", () => {

    if (inputText.value == "") {
        divError.innerHTML = `<label class="form-label label-error">Campo es requerido, debe ingresar una tarea</label>`;
        return;
    }

    let task = { id: createId(), descripcion: inputText.value, completado: false };

    taskList.push(task);
    inputText.value = "";
    renderizaHtml();
});

function renderizaHtml() {
    let htmlLabels = `
      <label class="form-label">Total: <strong>${taskList.length}</strong> </label>
      <label class="form-label">Realizadas: <strong>${tasksReady()}</strong></label>
    `;

    let htmlTable = "";
    for (let task of taskList) {
        let checked = task.completado ? "checked" : "";

        htmlTable += `
      <tr>
          <td>${task.id}</td>
          <td><p class="${checked}">${task.descripcion}</p></td>
          <td><input class="form-check-input" ${checked} onclick="readyTask(${task.id})" type="checkbox" /></td>
          <td><button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})"><i class="fa-solid fa-xmark"></i></button></td>
      </tr>
      `;
    }

    divLabels.innerHTML = htmlLabels;
    tableBody.innerHTML = htmlTable;
    divError.innerHTML = "";
}

function deleteTask(id) {
    let index = taskList.findIndex((ele) => ele.id == id);
    taskList.splice(index, 1);

    renderizaHtml();
}

function readyTask(id) {
    let task = taskList.find((ele) => ele.id == id);
    task.completado = task.completado ? false : true;
    renderizaHtml();
}

function tasksReady() {
    return taskList.filter((ele) => ele.completado == true).length;
}

function createId() {
    let task = taskList[taskList.length - 1];
    if (task == undefined) {
        return 1;
    }
    return task.id + 1;
}

renderizaHtml();
