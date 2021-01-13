
//import creatorGroups from './groups.js';
import { scheduleMatches, startGroupStage } from './league.js';
import { showGroupsAndTeams, showTitleWorldCupStageBegins } from './consoleLog.js';
import { groupsCreator, playOffGroupBuilder } from './groups.js';
import { roundOfSixteen } from './playoff.js';

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


    showTitleWorldCupStageBegins('COMIENZO DE LA FASE DE ELIMINATORIAS');
    const matchesPlayOff = playOffGroupBuilder(groups);

    roundOfSixteen(matchesPlayOff);
    quarterFinals();
    semifinals();
    thirdAndFourthPlace();
    final();

    showWorldChampionTeam();
}

start();



