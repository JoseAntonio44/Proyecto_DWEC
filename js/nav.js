//Función para cargar el navbar
function cargarNavbar() {
  //Crear XMLHttpRequest para leer nav.html
  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if (xhr.status === 200) {
      const body = document.body;
      const navContainer = document.createElement('div');
      navContainer.innerHTML = xhr.responseText;
      body.insertBefore(navContainer.firstElementChild, body.firstChild);

      //Detecta página actual y aplica la clase active
      const rutaActual = window.location.pathname;
      const paginaActual = rutaActual.substring(rutaActual.lastIndexOf('/') + 1);

      //Obtiene todos los enlaces del navbar
      const navItems = document.querySelectorAll('.navitem');

      navItems.forEach(function(item) {
        const href = item.getAttribute('href');

        //Si el href coincide con la página actual, añade la clase active
        if (href === paginaActual || (paginaActual === '' && href === 'index.html')) {
          item.classList.add('active');
        }
      });
    }
  };

  xhr.open('GET', 'nav.html', true);
  xhr.send();
}

//Ejecuta la función cargarNavbar cuando la página se carga
window.addEventListener('load', cargarNavbar);
