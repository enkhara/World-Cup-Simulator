//exporto objecte team
import {team, teamsNames} from './teams.js'
import creatorGroups, { group } from './groups.js'
import {leagueTeamsCreator, scheduleMatches, startGroupStage} from './league.js'
import {showGroupsAndTeams, showTitleWorldCupStageBegins} from './consoleLog.js'

const groups = [];
export const leagueTeams = [];
function start() {

    leagueTeamsCreator(leagueTeams);

    //FASE DE GRUPS
    
    creatorGroups(groups);
    scheduleMatches(groups);
    
    showGroupsAndTeams(groups);

    //empiezan los partidos por jornada
    //jugar partido
    showTitleWorldCupStageBegins('COMIENZA EL MUNDIAL');
    startGroupStage(groups);
    showTitleWorldCupStageBegins('COMIENZO DE LA FASE DE ELIMINATORIAS')

    

}

start();
