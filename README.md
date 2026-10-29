# Calendario Chile y CEPAL

Calendario diario para el iPhone con el estilo de una hoja de calendario de taco. Muestra la fecha del día con un número grande e indica si es feriado de Chile, de la CEPAL o de ambos; los días hábiles no llevan etiqueta y los domingos se muestran en rojo. Abajo aparecen el día anterior y el siguiente con su estado, y el ícono de calendario abre los 12 meses de 2026 para consultar cualquier fecha.

## Uso

- Toca el día anterior o el siguiente, o desliza la hoja hacia los lados, para cambiar de día.
- El botón **Hoy** vuelve a la fecha actual.
- El ícono de calendario muestra el año; toca un mes para ver sus días y la lista de feriados, y toca un día para ir a esa fecha.

## Colores

| Color | Significado |
|---|---|
| Rojo | Domingos y feriados de Chile |
| Ámbar | Feriado de la CEPAL |
| Rojo con sombra ámbar | Feriado de Chile y de la CEPAL |

## Instalar en el iPhone

1. Publica el repositorio como sitio estático (Vercel o GitHub Pages; no requiere compilación).
2. Abre la dirección en Safari.
3. Toca **Compartir → Agregar a inicio**.

## Widget para iPhone

iOS no permite widgets para apps web, así que el widget usa la app gratuita **Scriptable**. Hay tamaños pequeño, mediano y grande para la pantalla de inicio, y circular, rectangular y en línea para la pantalla bloqueada. Al tocarlo se abre el calendario en Safari.

1. Instala **Scriptable** desde la App Store.
2. Abre en Safari [el código del widget](https://raw.githubusercontent.com/pablocarvallo/calendario/main/widget/calendario-widget.js), selecciona todo el texto y cópialo.
3. En Scriptable, toca **+**, pega el código y, arriba, cambia el nombre del script a **Calendario**. Toca **▶** para ver una vista previa.
4. En la pantalla de inicio, mantén presionado un espacio vacío, toca **Editar → Agregar widget**, busca **Scriptable**, elige el tamaño y toca **Agregar widget**.
5. Mantén presionado el widget nuevo, toca **Editar widget** y en **Script** elige **Calendario**.

Para la pantalla bloqueada: mantenla presionada, toca **Personalizar → Pantalla bloqueada**, agrega un widget de Scriptable y elige el script **Calendario**.

El widget se actualiza solo cada medianoche. Si publicas la app en otra dirección (por ejemplo, Vercel), cambia la línea `APP_URL` al comienzo del script.

## Actualizar los feriados

Los feriados están en los objetos `CHILE` y `CEPAL` (formato `"MM-DD": "Nombre"`) y el año en la constante `YEAR`, en dos archivos: `index.html` (la app) y `widget/calendario-widget.js` (el widget). Después de cambiar el widget, vuelve a copiarlo en Scriptable.
