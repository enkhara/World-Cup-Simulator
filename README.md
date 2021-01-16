# World Cup Simulator JavaScript

## La estructura del simulador está dividida en dos partes:

- Fase de grupos
- Fase eliminatoria

### Fase de grupos

La disputarán 32 equipos que se agrupan en 8 grupos de 4 equipos cada uno.

- Los grupos se nombrarán por letras en orden alfabético, desde la A hasta la H.
- Los 32 equipos se repartirán de forma aleatoria en los 8 grupos.
- Para cada grupo se jugará una liga de una sola vuelta, en un todos contra todos.
- La victoria supondrá ganar 3 puntos, empate 1 punto y derrota 0 puntos.
- #### Criterios de la clasificación de la fase de grupos:
  - Los equipos se ordenaran en función de los puntos ganados descendentemente.
  - En caso de empate a puntos, será primero el equipo que haya ganado al otro en enfrentamiento directo.
  - En caso de empate en el enfrentamiento directo, será primero el equipo que tenga mejor diferencia de goles.
    -En caso de empate en todas las anteriores, se dispondrá a clasificarlos por orden alfabético.
- Sólo se clasificarán los dos primeros equipos de cada grupo, por lo tanto se clasificarán 16 equipos

### Fase de eliminatorias

Esta fase la disputarán los dos primeros equipos de cada grupo (16 equipos)

#### Primera ronda

Los enfrentamientos serán cruzando los primero de grupo contra los segundos de grupo entre grupos contiguos

#### Restricciones

- Dos equipos que se hayan enfrentado en la fase de grupos, no podrán volver a enfrentarse hasta la final. Por tanto, los primeros de los grupos A, B, C y D y los segundos de los grupos E, F, G y H irán por un lado y los primeros de los grupos E, F, G y H y los segundos de los grupos A, B, C y D por otro.

#### Segunda ronda

Se enfrentarán los 8 equipos ganadores de la primera ronda.

#### Tercera ronda

Se enfrentarán los 4 equipos ganadores de la segunda ronda.

#### Cuarta ronda

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
- Seguidamente, se mostrará el resultado del partido de la final, anunciando posteriormente el ganador como campeón del mundo.

## Estructura del código

El programa está dividido en archivos, cada uno de ellos desempeña tareas agrupadas por tipo:

### index.js

En este archivo, creamos la constante group, un array vacío, que será el contenedor que utilizaremos durante toda la fase de grupos.

Aquí definiremos la función startWorldCupSimulator() que será la encargada de ir llamando las funciones para que se desarrolle el mundial.

### teams.js

En esta parte definimos en primer lugar la prototipo shuffle para mezclar los nombres de los paises, de este modo en cada ejecución serán seleccionados de forma aleatoria 32 paises de entre 250.

La función getTeamsNamesWithPromise(), nos servirá para realizar una petición GET, para cargar los nombres de los paises de forma asíncrona mediante una promesa.

Una vez tengamos la información la asignaremos a un array que despues será mezclado con el con la función definida en el prototipo del array shuffle(), y con un forEach nos quedaremos con .
Seguidamente asignaremos con un forEach los primero 32 paises, a un array teamsNames,
que serán los nombres de los equipos participantes en el mundial.

También definiremos el objeto team que contendrá el nombre del equipo, los puntos acumulados, los goles a favor y los goles en contra.
En esta parte del programa se inicializara el nombre a null y el resto de las propiedades a 0.

### groups.js

Definimos el objeto group con nombre, equipos, array de los nombres de los equipos, schedule, array donde más adelante insertaremos las jornadas (schedule.lenght) y los partidos, objeto match, por jornada

Las funciones implementadas en esta parte serán:

#### Para la fase de grupos

- groupsCreator, que creará los grupos y añadira a group.team el nombre de los equipos de cada grupo, y el nombre de cada grupo, letras mayúsculas siguiendo el alfabeto.

#### Para la fase eliminatoria

- playOffGroupBuilder, que cojera los dos equipos primeros de cada grupo para enfentarlos, el primero de un grupo con el segundo del grupo contigo y a la inversa, y cada uno irá por un lado para evitar enfrentamientos entre equipos del mismo grupo.

### league.js

En este archivo se desarrolla toda la fase de grupos, y también es donde se define el objeto match, con el nombre del equipo local, el equipo visitante y los goles que ha marcado cada equipo.

En primer lugar implementamos la función scheduleMAtches() que consta de dos partes:

- En la primera parte se ejecuta la función allAgaisntAll por cada grupo, en la que se llena group.schedule con el esqueleto de lo que serán nuestas jornadas, en este caso 3 jornadas, cada una de 2 partidos. Estos partidos seran objetos match inicializados a null los equipos y 0 los goles.

La segunda parte se ocupa de rellenar los objetos match de group.schedule con los nombres de los equipos siguendo el algoritmo de todos contra todos por cada grupo.

En segundo lugar implementamos la función startGroupStage(), que consta de tres partes:

- Primero se jugaran los partidos por cada grupo por jornada, playMatchesPerDay(group), donde se crearán los goles con la función scoreGoals() usando Math.random() \* 5, de este modo el rango de goles irá de 0 a 5 por equipo.
  Una ver actualizado el schedule con el resultado de los 2 partidos de la jornada por grupo, updateGoals(), se actualizarán las estadísticas de cada grupo y se sumarán los puntos por ganar, empatar o perder de cada equipo, groupUpdateScore().

- Después se ordenarán los equipos según los puntos que tengan getRanking(), en el caso de empate, en primer lugar comprobaremos quien ha sido el vencedor en encuentro directo checkDirectMatch(), si también se ha producido empate, buscaremos el que tenga mejor diferencia de goles (goalsFor - goalsAgainst) teamWithMoreGoalsFor(), si aún así el empate persiste, lo resolveremos ordenandolos alfabéticamente orderTeamNamesAlphabetically().

- Por último, mostraremos en pantalla, por grupo y por jornada, el resultado de los partidos y como va quedando la clasificación de los equipos dentro de su grupo showMatchesAndStandings().

### playoff.js

Aquí se implementan todas las funciones para la fase eliminatoria.

En primer lugar, se jugarán los octavos de final roundOfSixteen(), en esta funcion se jugarán todos los partidos, playRound(), y se guardarán los ganadores de cada uno de ellos en un array winnersRoundOfSixteen.

En segundo lugar, se implementara la funcion playPlayOffRound(), que recibira el array de ganadores de la ronda anterior y creará los partidos y emparejamientos matchScheme() y jugará los partidos playRound() y los mostrará por pantalla showMatchesAndWinnersPerRound()

La funcion roundOfSixteen está implementada a parte por que es la inicial de la fase y en lugar de recibir un array de ganadores, recibe un array de partidos.

En tercer lugar, nos falta filtrar los equipos perdedores de la fase de semifinales, para obtener el tercer y cuarto puesto, esta parte se hace en index.js

### consoleLog.js

Este fichero implementa todas las funciones que se encargan de sacar la información por pantalla.

dividingLine() es una función para crear las líneas de separación entre fases.
showGroupsAndTeams() nos muestra el grupo, el nombre de los equipos que lo forman y el número de jornadas y partidos de cada una.

showTitleWorldCupStageBegins() muestra los inicios de cada fase

showMatchesAndStandings() aquí saca por pantalla cada grupo por la jornada que se este juando con los resultados de sus partidos y una tabla de como va quedando la clasificación de cada grupo.

showPlayOffRound() muestra la etapa en la que nos encontramos dentro de la fase eliminatoria

showMatchesAndWinnersPerRound() se encarga de mostrar el resultado de los partidos y el ganador de cada uno

showWinnerWorldChampionTeam() muestra el ganador de la copa del mundo.

## Módulos

Para el simulador, se ha usado una promesa para cargar los equipos desde un json externo, para ello es necesario instalar el modulo axios desde el terminal.

`npm i axios`
