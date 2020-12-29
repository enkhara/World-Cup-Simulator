import {team, teamsNames} from './teams.js'

const match ={
    homeTeam: null,
    awayTeam: null,
    goalsHome: 0,
    goalsAway: 0
}

//omplim l'array lliga amb l'objecte team amb la informació 
export function leagueTeamsCreator(leagueTeams) {
    //const leagueTeams =[];
    teamsNames.forEach(teamName =>{
        const teamPerLeague = Object.assign({}, team);
        teamPerLeague.name = teamName;
        leagueTeams.push(teamPerLeague)
    })
    return (leagueTeams);
}
// 3 jornades i 2 partits/ jornada
function allAgainstAll(group){
    const maxRow = group.teams.length - 2;
    const maxColumn = group.teams.length / 2;

    
    const matchesPerDay = [];
    
    const lasTeamNamePosition = group.teams.length - 1;
    for( let row = 0; row < maxRow; row++ ) {
        let teamNamePosition = 0;
        for (let column = 0; column < maxColumn; column++){
            const matchSchedule = Object.assign({}, match);
            if (teamNamePosition >= lasTeamNamePosition){
                teamNamePosition = 0;
            }
            matchSchedule.homeTeam = group.teams[teamNamePosition];
            matchSchedule.awayTeam = group.teams[lasTeamNamePosition];
            //console.log(matchSchedule)
            //matchesPerDay[row][column]= matchSchedule
            matchesPerDay.push(matchSchedule)
            teamNamePosition++;

        }group.schedule.push(matchesPerDay);
    }
    //console.log('ALL against ALL', group.schedule)
}
function allAgainstAllAlgorithm(group){
    group.schedule = []
    
    for (let i = 0; i < group.teams.length-1; i++){
        const matchDay = [];
        for( let j = 0; j <group.teams.length/2; j++){
            const matches = ['localTeam', 'AwayTeam'];
            matchDay.push(matches);

        
        }group.schedule.push(matchDay)
    }
}

// creen la planificació de partits per cada grup
export function scheduleMatches(groups){ 
    groups.forEach(group =>{
        
        allAgainstAllAlgorithm(group);

        console.log('Grupo',group.name, '\nJornada 1\n',group.schedule[0], '\nJornada 2\n',group.schedule[1], '\nJornada 3\n',group.schedule[2])
    })    
}

// for (let i = 0; i < 4; i++ ){
//     const teamsPerGroup = Object.assign({}, team)
//     teamsPerGroup.name = teamsNames[i]; 
//     groupA.push(teamsPerGroup)
// }


