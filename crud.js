// Declaracion de variables

let listaInscripciones = []
let indiceEdicion = null

const campoNombrePersona = document.getElementById('nombrePersona')
const campoActividadSeleccionada = document.getElementById('actividadSeleccionada')
const botonGuardar = document.getElementById('botonGuardar')
const cuerpoTablaInscripciones = document.getElementById('cuerpoTablaInscripciones')

botonGuardar.addEventListener('click', guardarInscripcion)

// funcion principal
function guardarInscripcion(){
    //leer datos del formulario
    const nombrePersona = campoNombrePersona.value.trim()
    const actividadSeleccionada = campoActividadSeleccionada.value
    const turnoMarcado = document.querySelector("input[name='turnoActividad']:checked")

    //validarlos
    if(nombrePersona === ""| actividadSeleccionada === ""| !turnoMarcado){
        alert('Todos los campos son obligatorios')
        return
    }

    //crear el objeto que guardamos
    const turnoSeleccionado = turnoMarcado.value

    const nuevaInscripcion = {
        nombre: nombrePersona,
        actividad: actividadSeleccionada,
        turno: turnoSeleccionado
    }

    //C de CRUD
    // listaInscripciones.push(nuevaInscripcion)

    //tras la edicion...
    if(indiceEdicion === null){
        listaInscripciones.push(nuevaInscripcion)
    } else {
        listaInscripciones[indiceEdicion] = nuevaInscripcion
        indiceEdicion = null 
        botonGuardar.textContent = 'Añadir inscripcion'
        botonGuardar.classList.remove('btn-warning')
        botonGuardar.classList.add('btn-info')
    }

    limpiarFormulario()
    mostrarInscripciones()

}

//R de read
function mostrarInscripciones(){
    cuerpoTablaInscripciones.innerHTML = ""

    listaInscripciones.forEach((insrcripcion, indice) =>{
        cuerpoTablaInscripciones.innerHTML +=`
        <tr>
            <td>${insrcripcion.nombre}</td>
            <td>${insrcripcion.actividad}</td>
            <td>${insrcripcion.turno}</td>
            <td>
                <button btn btn-warning onclick="editarInscripciones(${indice})">Editar</button>
                <button btn btn-danger onclick="borrarInscripcion(${indice})">Borrar</button>
            </td>
        </tr>
        `
    })
}

//limpiar formulario
function limpiarFormulario(){
    campoNombrePersona.value = ""
    campoActividadSeleccionada.value = ""
    document.querySelectorAll("input[name='turnoActividad']").forEach(radio=>{
        radio.checked = false
    })
}

//borrar
function borrarInscripcion(indice){
    listaInscripciones.splice(indice,1)
    mostrarInscripciones()
}

//U de CRUD

function editarInscripciones(indice){
    const insrcripcion = listaInscripciones[indice]

    campoNombrePersona.value = insrcripcion.nombre
    campoActividadSeleccionada.value = insrcripcion.actividad

    const radioTurno = document.querySelector('input[name="turnoActividad"][value="${inscripcion.turno}"]')

    if(radioTurno){
        radioTurno.checked = true
    }

    indiceEdicion = indice

    botonGuardar.textContent = 'Guardar cambios'
    botonGuardar.classList.remove('btn-info')
    botonGuardar.classList.add('btn-warning')
}
