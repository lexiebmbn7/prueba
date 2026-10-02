# Editar el código

## Textos y estructura

Cada página tiene su propio HTML. La cabecera y el pie están escritos en cada
archivo para que la navegación funcione incluso sin JavaScript. Si cambias un
enlace común, aplica el cambio en las catorce páginas.

Desde un HTML de la raíz, las rutas comienzan por `assets/` o `servicios/`.
Desde un detalle dentro de `servicios/`, los recursos empiezan por `../assets/`
y las páginas principales por `../`. Conserva esta diferencia al editar.

## Apariencia

Edita `assets/css/estilos.css`. Las variables de color están al principio,
dentro de `.mgm`. Las reglas de tamaño para tabletas y móviles se encuentran
en los bloques `@media`.

La fuente está en `assets/fonts/inter-latin-variable.woff2`. Su ruta es relativa
al archivo CSS y no se debe cambiar por una ruta del repositorio.

## Configuración

Edita `assets/js/config.js`:

- `whatsapp`: número con código de país, sin espacios ni signos.
- `appointmentUrl`: déjalo vacío para usar `agenda.html`. Puedes colocar una
  dirección real de Citas después de configurar esa función en Odoo.
- `promotion.enabled`: activa o desactiva una campaña.
- `promotion.start` y `promotion.end`: fechas en formato `YYYY-MM-DD`.
- `title`, `description` y `campaignCode`: contenido aprobado de la campaña.

La vigencia se calcula con la fecha de Lima. Mostrar una campaña no registra
beneficios ni reservas en un servidor.

## Logos y reseñas

Los nueve nombres y logos proceden del brochure corporativo 2026 y aparecen
en `index.html` y `resenas.html`. Sus imágenes están en `assets/img/clientes/`.
Los logos de plataformas están en `assets/img/tecnologia/`.

Cada empresa tiene un ID estable: `empresa-01` hasta `empresa-09`.
Conserva esos IDs en `resenas.html` para que los enlaces del inicio y la selección
de empresas sigan llegando al testimonio correcto.

En cada artículo incorpora la reseña autorizada, el nombre y cargo de su
autor y el servicio recibido cuando MGM los facilite. Por ahora se indica que
el testimonio está pendiente. Las fotos actuales son referenciales y no son
fotografías de clientes reales.

## Equipo

El equipo aparece en `index.html` y `nosotros.html`. Sustituye los dos perfiles
pendientes en las tarjetas y, en Nosotros, también en sus ventanas `<dialog>`.
Conserva los atributos `data-mgm-profile-open` y `data-mgm-profile-dialog`
asociados para que el botón abra el perfil correcto. La fotografía se puede tocar
y activar con el teclado para mostrar la información; no necesita un icono de +.

El carrusel de servicios del inicio se controla con sus flechas, el teclado o
un gesto táctil. Sus ocho diapositivas no tienen selectores superiores ni
números visibles.

## Formularios

Los formularios comprueban los datos y preparan un mensaje. La persona lo envía
desde WhatsApp. El código no contiene una base de datos, un calendario con
disponibilidad real, una pasarela de pago ni confirmaciones automáticas.

Para cambiar la lógica de menús, carruseles, perfiles, reseñas o formularios,
edita `assets/js/app.js`.
