//exporto objecte team
import {team, teamsNames} from './teams.js'

//creo la lliga array d'objectes i afegeixo l'objete team

const  league= []
teamsNames.forEach(teamName =>{
    console.log(teamName)
    team.name = teamName;
    league.push(team)
})

//console.log(league)

function start() {
    //fase de grups
    leguesCreator(howManyLegues())
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

