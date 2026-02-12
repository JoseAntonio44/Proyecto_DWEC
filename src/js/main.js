// Array de usuarios cargados desde el servidor
let usuarios = [];

// Guarda el índice del usuario que se está editando
let indiceEdicion = -1;

// URL base de la API
const API_BASE = "../ws";

// Carga usuarios desde el servidor mediante fetch
async function cargarUsuariosDesdeServidor() {
    try {
        const response = await fetch(`${API_BASE}/getUsuario.php`);
        const resultado = await response.json();

        if (resultado.success) {
            usuarios = resultado.data;
            cargarTabla(usuarios);
        } else {
            Swal.fire("Error", "No se pudieron cargar los usuarios: " + resultado.message, "error");
        }
    } catch (error) {
        Swal.fire("Error", "Error de conexión con el servidor", "error");
    }
}

// Carga la tabla con los datos
function cargarTabla(datos) {
    const tbody = document.querySelector("#tablaUsuarios tbody");
    tbody.innerHTML = "";

    datos.forEach((user, index) => {
        const fila = document.createElement("tr");
        fila.className = "border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700";

        // Campos a mostrar en la tabla
        const campos = ["nombre", "apellidos", "telefono", "email", "sexo"];
        campos.forEach(campo => {
            const celda = document.createElement("td");
            celda.className = "p-4";
            celda.textContent = user[campo] || "";
            fila.appendChild(celda);
        });

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

        const campos = ["nombre", "apellidos", "telefono", "email", "sexo"];
        campos.forEach((campo, i) => {
            const celda = document.createElement("td");
            celda.className = "p-4";
            celda.textContent = user[campo] || "";

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

// Elimina un usuario con confirmación SweetAlert2 y llamada asíncrona
async function eliminarUsuario(index) {
    const user = usuarios[index];

    const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Se eliminará a ${user.nombre} ${user.apellidos}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e11d48",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (!confirmacion.isConfirmed) return;

    try {
        const response = await fetch(`${API_BASE}/deleteUsuario.php?id=${user.id}`);
        const resultado = await response.json();

        if (resultado.success) {
            Swal.fire("Eliminado", resultado.message, "success");
            await cargarUsuariosDesdeServidor();
        } else {
            Swal.fire("Error", resultado.message, "error");
        }
    } catch (error) {
        Swal.fire("Error", "Error de conexión con el servidor", "error");
    }
}

// Guarda los cambios con confirmación SweetAlert2 y llamada asíncrona
async function guardarCambios(e) {
    e.preventDefault();

    if (indiceEdicion === -1) return;

    const confirmacion = await Swal.fire({
        title: "¿Guardar cambios?",
        text: "Se actualizarán los datos del usuario",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar"
    });

    if (!confirmacion.isConfirmed) return;

    const user = usuarios[indiceEdicion];

    // Crea FormData con los valores del formulario
    const formData = new FormData();
    formData.append("nombre", document.getElementById("editNombre").value.trim());
    formData.append("apellidos", document.getElementById("editApellidos").value.trim());
    formData.append("telefono", document.getElementById("editTelefono").value.trim());
    formData.append("email", document.getElementById("editEmail").value.trim());
    formData.append("sexo", document.getElementById("editSexo").value);

    try {
        const response = await fetch(`${API_BASE}/modificarUsuario.php?id=${user.id}`, {
            method: "POST",
            body: formData
        });
        const resultado = await response.json();

        if (resultado.success) {
            Swal.fire("Actualizado", resultado.message, "success");
            ocultarFormularioEdicion();
            await cargarUsuariosDesdeServidor();
        } else {
            Swal.fire("Error", resultado.message, "error");
        }
    } catch (error) {
        Swal.fire("Error", "Error de conexión con el servidor", "error");
    }
}

// Se ejecuta cuando se carga la página
window.onload = () => {
    // Carga usuarios desde el servidor
    cargarUsuariosDesdeServidor();

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
