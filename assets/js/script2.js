const inputLista = document.getElementById('input');
const listaInputs = document.getElementById('listaTareas');
const btn = document.querySelector('button');

let tareas = [];

btn.addEventListener('click', () => {
    if (inputLista.value === ''){
        alert('No se puede agregar un campo vacío!')
    } else {
        const nuevaTarea = {
            id: obtenerNuevoID(),
            texto: inputLista.value,
            completada: false
        };
        tareas.push(nuevaTarea);
        renderizarTareas();
    }
    console.log(tareas);
    inputLista.value = ""; 
});

function obtenerNuevoID() {
    const randomID = Math.floor(Math.random() * 1000);
    return Number(randomID);
}

listaInputs.addEventListener("click", function(event) {
    const elementoClicado = event.target;
    if (elementoClicado.tagName === "LI") {
        const idTarea = Number(elementoClicado.getAttribute('data-id'));
        const tarea = tareas.find(t => t.id === idTarea);
        console.log(tarea , idTarea);
        tarea.completada = !tarea.completada;
        renderizarTareas();
        
    } else if (elementoClicado.tagName === "SPAN") {
        const idTarea = Number(elementoClicado.parentElement.getAttribute('data-id'));
        tareas = tareas.filter(t => t.id !== idTarea);
        renderizarTareas();
    }
});

function renderizarTareas() {
    listaInputs.innerHTML = "";
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.innerHTML = tarea.texto;
        li.setAttribute('data-id', tarea.id);
        
        if (tarea.completada) {
            li.classList.add("marcado");
        }
        
        const span = document.createElement('span');
        span.innerHTML = 'x';
        
        li.appendChild(span);
        listaInputs.appendChild(li);
    });

    document.getElementById('total').textContent = tareas.length;
    document.getElementById('realizado').textContent = tareas.filter(t => t.completada).length;
}