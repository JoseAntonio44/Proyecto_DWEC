// Datos de ejemplo de los alumnos
const usuarios = [
    { nombre: "José", apellidos: "Antonio García", telefono: "612345678", email: "jose@example.com", sexo: "Hombre" },
    { nombre: "Ana", apellidos: "López Martínez", telefono: "698765432", email: "ana@gmail.com", sexo: "Mujer" },
    { nombre: "Laura", apellidos: "Martínez Pérez", telefono: "677112233", email: "laura@gmail.com", sexo: "Mujer" },
    { nombre: "Carlos", apellidos: "García Sánchez", telefono: "655998877", email: "carlos@hotmail.com", sexo: "Hombre" },
    { nombre: "María", apellidos: "Rodríguez López", telefono: "644556677", email: "maria@yahoo.com", sexo: "Mujer" },
    { nombre: "Pedro", apellidos: "Fernández García", telefono: "633445566", email: "pedro@outlook.com", sexo: "Hombre" },
    { nombre: "Lucía", apellidos: "González Ruiz", telefono: "622334455", email: "lucia@gmail.com", sexo: "Mujer" },
    { nombre: "Javier", apellidos: "Sánchez Moreno", telefono: "611223344", email: "javier@example.com", sexo: "Hombre" }
];

// Guarda el índice del usuario que se está editando
let indiceEdicion = -1;

// Carga la tabla con los datos
function cargarTabla(datos) {
    const tbody = document.querySelector("#tablaUsuarios tbody");
    tbody.innerHTML = "";

    datos.forEach((user, index) => {
        const fila = document.createElement("tr");
        // Añade clases de Tailwind para las filas
        fila.className = "border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700";

        // Crea celdas para cada campo del usuario
        for (const valor of Object.values(user)) {
            const celda = document.createElement("td");
            celda.className = "p-4";
            celda.textContent = valor;
            fila.appendChild(celda);
        }

        // Celda de acciones con botones
        const celdaAcciones = document.createElement("td");
        celdaAcciones.className = "p-4 flex gap-2";

        // Botón editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 font-medium";
        btnEditar.onclick = () => mostrarFormularioEdicion(index);
        celdaAcciones.appendChild(btnEditar);

        // Botón eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Borrar";
        btnEliminar.className = "bg-rose-500 text-white px-3 py-1 rounded-lg hover:bg-rose-600 font-medium";
        btnEliminar.onclick = () => eliminarUsuario(index);
        celdaAcciones.appendChild(btnEliminar);

        fila.appendChild(celdaAcciones);
        tbody.appendChild(fila);
    });
}

// Resalta texto en la búsqueda
function resaltarTexto(texto, celda) {
    const contenido = celda.textContent;
    const regex = new RegExp(`(${texto})`, 'gi');

    if (regex.test(contenido)) {
        celda.innerHTML = contenido.replace(regex, '<span class="bg-amber-300 dark:bg-amber-600 px-1 rounded">$1</span>');
        return true;
    }
    return false;
}

// Carga la tabla con texto resaltado
function cargarTablaConResaltado(datos, textoBusqueda) {
    const tbody = document.querySelector("#tablaUsuarios tbody");
    tbody.innerHTML = "";

    datos.forEach((user, index) => {
        const fila = document.createElement("tr");
        fila.className = "border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700";
        let hayCoincidencia = false;

        // Crea celdas para cada campo
        const campos = Object.values(user);
        campos.forEach((valor, i) => {
            const celda = document.createElement("td");
            celda.className = "p-4";
            celda.textContent = valor;

            // Resalta solo en nombre y apellidos (índices 0 y 1)
            if (i < 2 && textoBusqueda.length >= 2) {
                if (resaltarTexto(textoBusqueda, celda)) {
                    hayCoincidencia = true;
                }
            }
            fila.appendChild(celda);
        });

        // Si hay coincidencia, resalta la fila
        if (hayCoincidencia) {
            fila.className = "border-b border-slate-200 dark:border-slate-700 bg-indigo-50 dark:bg-indigo-900";
        }

        // Celda de acciones
        const celdaAcciones = document.createElement("td");
        celdaAcciones.className = "p-4 flex gap-2";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 font-medium";
        btnEditar.onclick = () => mostrarFormularioEdicion(index);
        celdaAcciones.appendChild(btnEditar);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Borrar";
        btnEliminar.className = "bg-rose-500 text-white px-3 py-1 rounded-lg hover:bg-rose-600 font-medium";
        btnEliminar.onclick = () => eliminarUsuario(index);
        celdaAcciones.appendChild(btnEliminar);

        fila.appendChild(celdaAcciones);
        tbody.appendChild(fila);
    });
}

// Muestra el formulario de edición
function mostrarFormularioEdicion(index) {
    indiceEdicion = index;
    const user = usuarios[index];

    // Rellena el formulario con los datos del usuario
    document.getElementById("editNombre").value = user.nombre;
    document.getElementById("editApellidos").value = user.apellidos;
    document.getElementById("editTelefono").value = user.telefono;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editSexo").value = user.sexo;

    // Muestra el formulario (quita clase hidden)
    document.getElementById("formularioEdicion").classList.remove("hidden");
}

// Oculta el formulario de edición
function ocultarFormularioEdicion() {
    document.getElementById("formularioEdicion").classList.add("hidden");
    document.getElementById("formEditar").reset();
    indiceEdicion = -1;
}

// Elimina un usuario
function eliminarUsuario(index) {
    usuarios.splice(index, 1);
    cargarTabla(usuarios);
}

// Guarda los cambios
function guardarCambios(e) {
    e.preventDefault();

    if (indiceEdicion === -1) return;

    // Obtiene los valores del formulario
    const nombre = document.getElementById("editNombre").value.trim();
    const apellidos = document.getElementById("editApellidos").value.trim();
    const telefono = document.getElementById("editTelefono").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const sexo = document.getElementById("editSexo").value;

    // Actualiza el usuario en el array
    usuarios[indiceEdicion] = {
        nombre: nombre,
        apellidos: apellidos,
        telefono: telefono,
        email: email,
        sexo: sexo
    };

    // Recarga la tabla y oculta formulario
    cargarTabla(usuarios);
    ocultarFormularioEdicion();
}

// Se ejecuta cuando se carga la página
window.onload = () => {
    cargarTabla(usuarios);

    // Evento del buscador
    const buscador = document.getElementById("buscador");
    if (buscador) {
        buscador.addEventListener("input", (e) => {
            const texto = e.target.value.toLowerCase().trim();

            // Si hay menos de 2 caracteres, muestra todos
            if (texto.length < 2) {
                cargarTabla(usuarios);
                return;
            }

            // Filtra usuarios por nombre o apellidos
            const filtrados = usuarios.filter(u =>
                u.nombre.toLowerCase().includes(texto) ||
                u.apellidos.toLowerCase().includes(texto)
            );

            // Carga tabla con resaltado
            cargarTablaConResaltado(filtrados, texto);
        });
    }

    // Evento del formulario de edición
    const formEditar = document.getElementById("formEditar");
    if (formEditar) {
        formEditar.addEventListener("submit", guardarCambios);
    }

    // Evento del botón cancelar
    const btnCancelar = document.getElementById("btnCancelar");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", ocultarFormularioEdicion);
    }
};
