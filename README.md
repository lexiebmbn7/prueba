# MGM Perú — sitio web para GitHub

Versión estática del diseño aprobado. Incluye las catorce páginas, los carruseles,
las tarjetas interactivas del equipo, las reseñas y los formularios por WhatsApp.
El HTML, los estilos, la lógica y las imágenes están en archivos separados.

Abre `index.html` en un navegador para probarlo. No requiere instalar paquetes,
compilar el proyecto, WordPress ni una conexión para mostrar el diseño.

## Estructura

| Archivo o carpeta | Contenido |
| --- | --- |
| `index.html` | Inicio |
| `nosotros.html` | Presentación, propuesta de valor, equipo, pilares y diferenciales |
| `servicios.html` | Ocho servicios, apoyo funcional Odoo y Buk, proceso y preguntas |
| `resenas.html` | Nueve empresas y sus espacios de reseñas |
| `contacto.html` | Canales de contacto, formulario y ubicación |
| `agenda.html` | Solicitud de asesoría |
| `servicios/gestion-contable.html` | Detalle de gestión contable |
| `servicios/asesoria-y-auditoria-tributaria.html` | Detalle de asesoría tributaria |
| `servicios/auditoria-tributaria.html` | Detalle de auditoría tributaria |
| `servicios/auditoria-financiera-y-contable.html` | Detalle de auditoría financiera y contable |
| `servicios/consultoria-financiera.html` | Detalle de consultoría financiera |
| `servicios/gestion-de-nominas.html` | Gestión laboral y planillas |
| `servicios/asesoria-legal.html` | Detalle de asesoría legal |
| `servicios/creacion-de-empresa-ruc-20.html` | Detalle de constitución de empresas |
| `assets/css/estilos.css` | Colores, fuentes, diseños y adaptación móvil |
| `assets/js/config.js` | WhatsApp, URL opcional de citas y campañas |
| `assets/js/app.js` | Menús, carruseles, perfiles, reseñas y formularios |
| `assets/img/marca/` | Logotipos MGM |
| `assets/img/clientes/` | Nueve logos extraídos del brochure |
| `assets/img/tecnologia/` | Logos Odoo y Buk del brochure |
| `assets/img/equipo/` | Roberto y fotografía provisional del equipo |
| `assets/img/servicios/` | Fotografías de los servicios |
| `assets/img/oficina/` | Fotografías de oficina y asesoría |
| `assets/img/resenas/` | Fotografías referenciales de las reseñas |
| `assets/img/mapa/` | Mapa referencial |
| `assets/fonts/` | Fuente Inter y su licencia |
| `docs/` | Instrucciones, recursos y comprobación local |
| `SUBIR_A_GITHUB.txt` | Pasos rápidos para subir y publicar |

## Subir el proyecto

1. Extrae el ZIP.
2. Abre tu repositorio en GitHub y entra en **Add file → Upload files**.
3. Arrastra el contenido extraído, conservando las carpetas.
4. Comprueba que `index.html` esté en la raíz del repositorio, junto a `assets/`.
5. Guarda el cambio con un mensaje como `Añadir diseño de MGM Perú`.

Sube los archivos extraídos. GitHub Pages no descomprime un ZIP para servirlo
como página. Si tu repositorio ya contiene una web, este contenido sustituirá
los archivos que tengan el mismo nombre al guardar tus cambios.

## Activar GitHub Pages

En **Settings → Pages → Build and deployment**, elige **Deploy from a branch**.
Selecciona la rama donde subiste los archivos (normalmente `main`) y la carpeta
**/(root)**. Guarda. GitHub mostrará la dirección publicada cuando termine.

Los enlaces y recursos son relativos: funcionan tanto en la raíz de un dominio
como bajo la carpeta de un repositorio, sin poner su nombre dentro del código.

Más detalle: [Guía de GitHub Pages](docs/GITHUB_PAGES.md).

## Editar

Los textos se cambian en el HTML de cada página. Los colores y las medidas se
cambian en `assets/css/estilos.css`. La configuración pública se cambia en
`assets/js/config.js`. Consulta [la guía de edición](docs/EDICION.md).

Los ocho servicios, sus fotografías y los nueve logos de clientes se actualizaron
con el brochure corporativo 2026. Las reseñas y dos perfiles de equipo siguen
pendientes. La presentación de Nosotros sigue la imagen de referencia aportada y las páginas interiores no tienen banners azules. Las imágenes de Nosotros, oficina y reseñas son referenciales. La foto de
Roberto y los logotipos MGM proceden del sitio original.

La propuesta de valor y los diferenciales se muestran en Nosotros. El brochure
no contiene misión ni visión oficiales ni testimonios de clientes; no se
redactaron declaraciones oficiales ni reseñas nuevas. El bloque de valores y
forma de trabajo fue eliminado del inicio. Consulta [la actualización de contenido](docs/ACTUALIZACION_BROCHURE.md).

Los formularios preparan mensajes para enviarlos por WhatsApp. Una solicitud
de cita requiere que MGM confirme la disponibilidad; esta versión no crea
reservas ni registros de clientes en un servidor.

La etiqueta `noindex,nofollow` se conserva porque esta entrega es una vista
previa. Si decides convertir GitHub Pages en el sitio definitivo, revisa esa
etiqueta, los datos finales y la configuración SEO del dominio que publiques.

Las plantillas e instrucciones para instalarlo en Odoo están en el paquete
`MGM_Rebranding_Odoo.zip` entregado por separado.
