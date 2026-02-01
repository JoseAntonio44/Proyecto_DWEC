// Cambia entre modo claro y oscuro
// Guarda la preferencia en localStorage para mantenerla entre páginas

// Carga el modo guardado cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene el modo guardado en localStorage
    const modoGuardado = localStorage.getItem('modo');

    // Si hay un modo guardado y es 'oscuro', activa modo oscuro
    if (modoGuardado === 'oscuro') {
        document.documentElement.classList.add('dark');
        actualizarBoton(true);
    }

    // Agrega evento al botón de cambio de modo
    const btnModo = document.getElementById('btnModo');
    if (btnModo) {
        btnModo.addEventListener('click', cambiarModo);
    }
});

// Cambia el modo
function cambiarModo() {
    // Comprueba si actualmente está en modo oscuro
    const estaOscuro = document.documentElement.classList.contains('dark');

    if (estaOscuro) {
        // Cambia a modo claro
        document.documentElement.classList.remove('dark');
        localStorage.setItem('modo', 'claro');
        actualizarBoton(false);
    } else {
        // Cambia a modo oscuro
        document.documentElement.classList.add('dark');
        localStorage.setItem('modo', 'oscuro');
        actualizarBoton(true);
    }
}

// Actualiza el texto del botón
function actualizarBoton(oscuro) {
    const btnModo = document.getElementById('btnModo');
    if (btnModo) {
        if (oscuro) {
            // SVG de sol para modo claro
            btnModo.innerHTML = `
                <svg class="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
                Claro`;
        } else {
            // SVG de luna para modo oscuro
            btnModo.innerHTML = `
                <svg class="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
                Oscuro`;
        }
    }
}
