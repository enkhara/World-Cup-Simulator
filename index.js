
import creatorGroups from './groups.js';
import {leagueTeamsCreator, scheduleMatches, startGroupStage} from './league.js';
import {showGroupsAndTeams, showTitleWorldCupStageBegins} from './consoleLog.js';
import groupsCreator from './groups.js';

const groups = [];
export const leagueTeams = [];
export const auxLeague = [];
function start() {

    //leagueTeamsCreator(leagueTeams);
    groupsCreator(groups);
    scheduleMatches(groups);
    
    showGroupsAndTeams(groups);

    showTitleWorldCupStageBegins('COMIENZA EL MUNDIAL');
    startGroupStage(groups);

    showTitleWorldCupStageBegins('COMIENZO DE LA FASE DE ELIMINATORIAS')
}

start();



console.log('auxleagye',auxLeague)