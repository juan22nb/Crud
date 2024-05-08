let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
    document.getElementById('mensajeNotificacion').textContent = "Empleado ingresado exitosamente.";
    document.getElementById('notificacion').style.display = 'block';
    setTimeout(() => document.getElementById('notificacion').style.display = 'none', 3000);
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');
    
    listaEmpleados.forEach(empleado => {
        const {id, nombre, puesto} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    const {id, nombre, puesto} = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;

}

function editarEmpleado() {

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;

    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;

        }

    });

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
    document.getElementById('mensajeNotificacion').textContent = "Empleado editado exitosamente.";
    document.getElementById('notificacion').style.display = 'block';
    setTimeout(() => document.getElementById('notificacion').style.display = 'none', 3000);
}

function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
    document.getElementById('mensajeNotificacion').textContent = "Empleado eliminado exitosamente.";
    document.getElementById('notificacion').style.display = 'block';
    setTimeout(() => document.getElementById('notificacion').style.display = 'none', 3000);
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
        
    }
}

function manejarKeypress(event) {

    if (!/[a-zA-Z\s]/.test(String.fromCharCode(event.keyCode))) {
        event.preventDefault();
        document.getElementById('mensajeNotificacion').textContent = "Por favor, solo se permiten letras.";
        document.getElementById('notificacion').style.display = 'block';
        setTimeout(() => document.getElementById('notificacion').style.display = 'none', 3000);
    }
}

nombreInput.addEventListener('keypress', manejarKeypress);
puestoInput.addEventListener('keypress', manejarKeypress);
