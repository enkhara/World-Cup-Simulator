//exporto objecte team
import {team, teamsNames} from './teams.js'
//import teamsNames from './teams.js'
//import League from './league.js'

//creo la lliga array d'objectes i afegeixo l'objete team


/*
const numberOfTeams = teamsNames.length;

function start() {
    //fase de grups
    howManyLeagues(numberOfTeams);
    //leguesCreator(howManyLegues())
        //definir número de lligues que hi haurà (equips/4)
        //crear les lligues i omplirles amb els equips shuffle i slide
        //algoritme de tots contra tots 
        //jugar els partits
        //omplir les estadístiques find
        //classificació sort
    //mostrar resultats per pantalla
        //pintar per pantalla classificació
    //fase eliminatòria
        //quedarse amb els dos primers de cada lliga
        // de dos en dos lligues enfrontar el primer amb el segon 
        //crear dues fases eliminatories per que no coincideixin els de una mateixa lliga
    //gestionar grups de 2 en dos 1r contra segon

    //mostrar resultats per pantalla
}

start();
const groups = 8; 
function leaguesNames(groups) {
    const leagueNames = [];
    for (let i = 65; i < groups + 65; i ++){
        leagueNames.push(String.fromCharCode(i));
    }
    console.log (`aux ${leagueNames} ` );
    return leagueNames;
}
const names = leaguesNames(groups);
*/



const groupA = [];

for (let i = 0; i < 4; i++ ){
    const teamsPerGroup = Object.assign({}, team)
    teamsPerGroup.name = teamsNames[i]; 
    groupA.push(teamsPerGroup)
}

console.table(groupA)

