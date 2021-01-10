
import creatorGroups from './groups.js';
import {leagueTeamsCreator, scheduleMatches, startGroupStage} from './league.js';
import {showGroupsAndTeams, showTitleWorldCupStageBegins} from './consoleLog.js';
import groupsCreator from './groups.js';

export const groups = [];
//export const leagueTeams = [];
//export const auxLeague = [];
function start() {

    //leagueTeamsCreator(leagueTeams);
    // groupsCreator(groups);
    // scheduleMatches(groups);
    
    // showGroupsAndTeams(groups);
    groupsCreator(groups);
    scheduleMatches();
    
    showGroupsAndTeams(groups);

    showTitleWorldCupStageBegins('COMIENZA EL MUNDIAL');
    //startGroupStage(groups);
    startGroupStage();


    showTitleWorldCupStageBegins('COMIENZO DE LA FASE DE ELIMINATORIAS')
}

start();



