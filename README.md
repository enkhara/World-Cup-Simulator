# World Cup Simulator JavaScript

La estructura del simulador está dividida en dos partes:

- Fase de grupos
- Fase eliminatoria

## Fase de grupos

La disputarán 32 equipos que se agrupan en 8 grupos de 4 equipos cada uno.

- Los grupos se nombrarán por letras en orden alfabético, desde la A hasta la H.
- Los 32 equipos se repartirán de forma aleatoria en los 8 grupos.
- Para cada grupo se jugará una liga de una sola vuelta, en un todos contra todos.
- La victoria supondrá ganar 3 puntos, empate 1 punto y derrota 0 puntos.
- ### Criterios de la clasificación de la fase de grupos:
  - Los equipos se ordenaran en función de los puntos ganados descendentemente.
  - En caso de empate a puntos, será primero el equipo que haya ganado al otro en enfrentamiento directo.
  - En caso de empate en el enfrentamiento directo, será primero el equipo que tenga mejor diferencia de goles.
    -En caso de empate en todas las anteriores, se dispondrá a clasificarlos por orden alfabético.
- Sólo se clasificarán los dos primeros equipos de cada grupo, por lo tanto se clasificarán 16 equipos

## Fase de eliminatorias

Esta fase la disputarán los dos primeros equipos de cada grupo (16 equipos)

### Primera ronda

Los enfrentamientos serán cruzando los primero de grupo contra los segundos de grupo entre grupos contiguos

### Restricciones

- Dos equipos que se hayan enfrentado en la fase de grupos, no podrán volver a enfrentarse hasta la final. Por tanto, los primeros de los grupos A, B, C y D y los segundos de los grupos E, F, G y H irán por un lado y los primeros de los grupos E, F, G y H y los segundos de los grupos A, B, C y D por otro.

### Segunda ronda

Se enfrentarán los 8 equipos ganadores de la primera ronda.

### Tercera ronda

Se enfrentarán los 4 equipos ganadores de la segunda ronda.

### Cuarta ronda

- Los equipos ganadores de la tercera ronda, pasarán a la final y el que gane de ellos ganara la World Cup, el perdedor será el segundo.
- Para el tercer y cuarto puesto se disputará un partido, el que gane será tercero y el perdedor cuarto.

## Requisitos del programa

- Mostrar por pantalla la información de los equipos que hay en cada grupo y la planificación de los partidos del mismo
  - Nombre del grupo
  - Listado de los equipos (uno por línea)
- Despues se anunciará con un texto el comienzo del torneo.
- A continuación se mostrarán los resultados de los partidos y la clasificación de cada grupo por jornadas.
- Una vez finalizada la fase de grupos, se anunciará el comienzo de la fase eliminatoria.
- A continuación se mostrarán los resultados de los partidos en las diferentes rondas, indicando los equipos que se clasificarán para la siguiente ronda.
- Una vez finalizada las semifinales, se mostrará el resultado del partido de tercer y cuarto puesto ( que se juega entre los equipos no clasificados para la final)
- Seguidamente, se mostrará el resultado del partido de la final, anunciando posteriormente el ganador como campeón del mundo
