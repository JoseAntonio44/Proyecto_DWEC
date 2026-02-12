# CDN vs Descarga Local de Librerías

## Ventajas de usar un CDN

- **Caché del navegador**: Si el usuario ya visitó otra web que usa la misma librería desde el mismo CDN, el navegador la tendrá cacheada y no necesitará descargarla de nuevo.
- **Velocidad de carga**: Los CDN distribuyen los archivos en servidores repartidos por todo el mundo, por lo que el usuario descarga desde el servidor más cercano geográficamente.
- **Menor carga en el servidor propio**: Al servirse desde servidores externos, se reduce el ancho de banda y la carga del servidor donde está alojada la aplicación.
- **Facilidad de implementación**: Basta con añadir una etiqueta `<script>` o `<link>` con la URL del CDN. No hay que descargar ni mantener archivos localmente.
- **Actualizaciones automáticas**: Si se usa una URL con versión genérica (por ejemplo `@latest`), la librería se actualiza sin intervención manual.

## Desventajas de usar un CDN

- **Dependencia de terceros**: Si el CDN se cae o deja de funcionar, la librería no se cargará y la aplicación puede fallar.
- **Requiere conexión a Internet**: En entornos sin conexión o con conexión limitada, las librerías no se cargarán.
- **Problemas de privacidad**: El proveedor del CDN puede registrar las IPs de los usuarios que acceden al recurso.
- **Sin control de versiones**: Si la URL apunta a la última versión, una actualización con cambios incompatibles podría romper la aplicación.
- **Bloqueo por firewalls**: Algunos entornos corporativos o educativos pueden bloquear dominios de CDN externos.

## Ventajas de la descarga local

- **Independencia total**: La aplicación funciona sin depender de servicios externos ni de conexión a Internet.
- **Control de versiones**: Se usa exactamente la versión descargada, sin riesgo de actualizaciones inesperadas que rompan la aplicación.
- **Mayor seguridad**: No hay riesgo de que un CDN sea comprometido y sirva código malicioso.
- **Funciona offline**: Ideal para aplicaciones que deben funcionar sin conexión a Internet.
- **Sin problemas de privacidad**: No se envían peticiones a servidores de terceros.

## Desventajas de la descarga local

- **Mayor peso del proyecto**: Los archivos de las librerías se almacenan dentro del proyecto, aumentando su tamaño.
- **Mantenimiento manual**: Las actualizaciones de las librerías deben hacerse manualmente, descargando y reemplazando los archivos.
- **Mayor carga en el servidor**: El servidor propio debe servir todos los archivos estáticos, lo que aumenta el consumo de ancho de banda.
- **Sin aprovechar caché compartida**: Cada sitio web sirve su propia copia, por lo que el navegador no puede reutilizar una copia cacheada de otro sitio.
- **Configuración inicial más costosa**: Requiere descargar, organizar y referenciar correctamente los archivos en el proyecto.
