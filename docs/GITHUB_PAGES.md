# Publicar en GitHub Pages

Esta entrega es HTML, CSS y JavaScript estático. Puedes publicarla desde una
rama sin configurar una compilación ni un flujo personalizado de Actions.

## Subida desde el navegador

1. Extrae el ZIP antes de subirlo.
2. En tu repositorio, abre **Add file → Upload files**.
3. Arrastra los archivos y carpetas extraídos. Mantén sus nombres y su estructura.
4. Confirma que `index.html`, `nosotros.html`, `servicios.html`, `resenas.html`,
   `contacto.html` y `agenda.html` están en la raíz.
5. Confirma que están las carpetas `assets/`, `servicios/` y `docs/`.
6. Guarda el cambio. Si lo guardas en una nueva rama, completa el pull request
   antes de publicar desde la rama de destino.

Para un repositorio que ya contiene otra página, revisa los archivos con los
mismos nombres antes de guardar la subida. La entrega no modifica tu repositorio
por sí misma.

## Publicación

1. Abre **Settings → Pages**.
2. En **Build and deployment → Source**, selecciona **Deploy from a branch**.
3. Elige la rama donde quedó el código y la carpeta **/(root)**.
4. Guarda y espera a que GitHub muestre el enlace de la web.

Si tu rama se llama `master` u otro nombre, elige esa rama. No hace falta
renombrarla ni colocar un nombre de repositorio en las rutas del código.

## Si falta una imagen o una página

- Comprueba que subiste toda la carpeta `assets/`.
- Comprueba que los archivos de detalle están dentro de `servicios/`.
- Respeta mayúsculas, minúsculas y extensiones de los nombres entregados.
- Comprueba que `index.html` está en la carpeta seleccionada como origen de Pages.
- Consulta el despliegue de Pages en la pestaña **Actions** si la publicación falla.

## Documentación oficial consultada

- [Añadir archivos a un repositorio](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).
- [Configurar el origen de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Revisada el 1 de octubre de 2026, hora de Lima.
