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

function cargarTabla(datos) {
  const tbody = document.querySelector("#tablaUsuarios tbody");
  tbody.innerHTML = "";

  datos.forEach((user) => {
    const fila = document.createElement("tr");

    //celdas para cada campo del usuario
    for (const valor of Object.values(user)) {
      const celda = document.createElement("td");
      celda.textContent = valor;
      fila.appendChild(celda);
    }

    //celda de acciones con botón eliminar
    const celdaAcciones = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.onclick = () => {
      fila.remove();
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

  datos.forEach((user) => {
    const fila = document.createElement("tr");
    let hayCoincidencia = false;

    //celdas para cada campo del usuario
    const campos = Object.values(user);
    campos.forEach((valor, index) => {
      const celda = document.createElement("td");
      celda.textContent = valor;
      
      if (index < 2 && textoBusqueda.length >= 2) {
        if (resaltarTexto(textoBusqueda, celda)) {
          hayCoincidencia = true;
        }
      }
      
      fila.appendChild(celda);
    });

    if (hayCoincidencia) {
      fila.classList.add("fila-resaltada");
    }

    //celda de acciones con botón eliminar
    const celdaAcciones = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.onclick = () => {
      fila.remove();
    };
    celdaAcciones.appendChild(btnEliminar);

    fila.appendChild(celdaAcciones);
    tbody.appendChild(fila);
  });
}

//carga la tabla cuando se carga la página
window.onload = () => {
  cargarTabla(usuarios);

  //añade evento de búsqueda al input
  const buscador = document.getElementById("buscador");
  
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
};
