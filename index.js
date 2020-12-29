//exporto objecte team
import {team, teamsNames} from './teams.js'
import creatorGroups from './groups.js'
import {leagueTeamsCreator, scheduleMatches} from './league.js'
import {showGroupsAndTeams} from './consoleLog.js'

const groups = [];
const leagueTeams = [];
function start() {

    leagueTeamsCreator(leagueTeams);

    //FASE DE GRUPS
    
    creatorGroups(groups);
    scheduleMatches(groups);
    //groups.forEach(group => console.log(group.schedule))
    //console.log(groups);
    
    //showGroupsAndTeams(groups);

}

start();