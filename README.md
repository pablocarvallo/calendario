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

## Actualizar los feriados

Los feriados están en `index.html`, en los objetos `CHILE` y `CEPAL` (formato `"MM-DD": "Nombre"`), y el año en la constante `YEAR`.
