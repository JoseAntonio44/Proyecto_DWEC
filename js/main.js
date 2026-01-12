//Datos de ejemplo
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

//Variable global para el índice del usuario que se está editando
let indiceEdicion = -1;

function cargarTabla(datos) {
  const tbody = document.querySelector("#tablaUsuarios tbody");
  tbody.innerHTML = "";

  datos.forEach((user, index) => {
    const fila = document.createElement("tr");

    //celdas para cada campo del usuario
    for (const valor of Object.values(user)) {
      const celda = document.createElement("td");
      celda.textContent = valor;
      fila.appendChild(celda);
    }

    //celda de acciones con botón editar y eliminar
    const celdaAcciones = document.createElement("td");

    //Botón editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn-editar";
    btnEditar.onclick = () => {
      mostrarFormularioEdicion(index);
    };
    celdaAcciones.appendChild(btnEditar);

    //Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Borrar Elemento";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.onclick = () => {
      eliminarUsuario(index);
    };
    celdaAcciones.appendChild(btnEliminar);

    fila.appendChild(celdaAcciones);
    tbody.appendChild(fila);
  });
}

function resaltarTexto(texto, celda) {
  const contenido = celda.textContent;
  const regex = new RegExp(`(${texto})`, 'gi');

  if (regex.test(contenido)) {
    celda.innerHTML = contenido.replace(regex, '<span class="resaltado">$1</span>');
    return true;
  }
  return false;
}

function cargarTablaConResaltado(datos, textoBusqueda) {
  const tbody = document.querySelector("#tablaUsuarios tbody");
  tbody.innerHTML = "";

  datos.forEach((user, index) => {
    const fila = document.createElement("tr");
    let hayCoincidencia = false;

    //celdas para cada campo del usuario
    const campos = Object.values(user);
    campos.forEach((valor, i) => {
      const celda = document.createElement("td");
      celda.textContent = valor;

      if (i < 2 && textoBusqueda.length >= 2) {
        if (resaltarTexto(textoBusqueda, celda)) {
          hayCoincidencia = true;
        }
      }

      fila.appendChild(celda);
    });

    if (hayCoincidencia) {
      fila.classList.add("fila-resaltada");
    }

    //celda de acciones con botón editar y eliminar
    const celdaAcciones = document.createElement("td");

    //Botón editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn-editar";
    btnEditar.onclick = () => {
      mostrarFormularioEdicion(index);
    };
    celdaAcciones.appendChild(btnEditar);

    //Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Borrar Elemento";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.onclick = () => {
      eliminarUsuario(index);
    };
    celdaAcciones.appendChild(btnEliminar);

    fila.appendChild(celdaAcciones);
    tbody.appendChild(fila);
  });
}

//Función para mostrar el formulario de edición
function mostrarFormularioEdicion(index) {
  indiceEdicion = index;
  const user = usuarios[index];

  //Rellenar el formulario con los datos del usuario
  document.getElementById("editNombre").value = user.nombre;
  document.getElementById("editApellidos").value = user.apellidos;
  document.getElementById("editTelefono").value = user.telefono;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editSexo").value = user.sexo;

  //Mostrar el formulario
  document.getElementById("formularioEdicion").style.display = "block";
}

//Función para ocultar y limpiar el formulario
function ocultarFormularioEdicion() {
  document.getElementById("formularioEdicion").style.display = "none";
  document.getElementById("formEditar").reset();
  indiceEdicion = -1;
}

//Función para eliminar usuario
function eliminarUsuario(index) {
  usuarios.splice(index, 1);
  cargarTabla(usuarios);
}

//Función para guardar los cambios del usuario editado
function guardarCambios(e) {
  e.preventDefault();

  if (indiceEdicion === -1) return;

  //Obtener los valores del formulario
  const nombre = document.getElementById("editNombre").value.trim();
  const apellidos = document.getElementById("editApellidos").value.trim();
  const telefono = document.getElementById("editTelefono").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const sexo = document.getElementById("editSexo").value;

  //Actualizar el usuario en el array
  usuarios[indiceEdicion] = {
    nombre: nombre,
    apellidos: apellidos,
    telefono: telefono,
    email: email,
    sexo: sexo
  };

  //Recargar la tabla
  cargarTabla(usuarios);

  //Oculta el formulario
  ocultarFormularioEdicion();
}

//carga la tabla cuando se carga la página
window.onload = () => {
  cargarTabla(usuarios);

  //añade evento de búsqueda al input
  const buscador = document.getElementById("buscador");

  if (buscador) {
    buscador.addEventListener("input", (e) => {
      const texto = e.target.value.toLowerCase().trim();

      //si hay menos de 2 caracteres, mostrar todos los usuarios sin filtrar
      if (texto.length < 2) {
        cargarTabla(usuarios);
        return;
      }

      //filtra usuarios por nombre o apellidos
      const filtrados = usuarios.filter(u =>
        u.nombre.toLowerCase().includes(texto) ||
        u.apellidos.toLowerCase().includes(texto)
      );

      //carga tabla con resaltado
      cargarTablaConResaltado(filtrados, texto);
    });
  }

  //Evento para el formulario de edición
  const formEditar = document.getElementById("formEditar");
  if (formEditar) {
    formEditar.addEventListener("submit", guardarCambios);
  }

  //Evento para el botón cancelar
  const btnCancelar = document.getElementById("btnCancelar");
  if (btnCancelar) {
    btnCancelar.addEventListener("click", ocultarFormularioEdicion);
  }
};
