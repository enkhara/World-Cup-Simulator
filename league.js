import { group, _NUMBEROFTEAMSPERGROUP_} from './groups.js';
import {team, teamsNames} from './teams.js';
import {leagueTeams} from './index.js';

const match ={
    localTeam: null,
    awayTeam: null,
    localGoals: 0,
    awayGoals: 0
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
// function allAgainstAll(group){
//     const maxRow = group.teams.length - 2;
//     const maxColumn = group.teams.length / 2;

    
//     const matchesPerDay = [];
    
//     const lasTeamNamePosition = group.teams.length - 1;
//     for( let row = 0; row < maxRow; row++ ) {
//         let teamNamePosition = 0;
//         for (let column = 0; column < maxColumn; column++){
//             const matchSchedule = Object.assign({}, match);
//             if (teamNamePosition >= lasTeamNamePosition){
//                 teamNamePosition = 0;
//             }
//             matchSchedule.homeTeam = group.teams[teamNamePosition];
//             matchSchedule.awayTeam = group.teams[lasTeamNamePosition];
//             //console.log(matchSchedule)
//             //matchesPerDay[row][column]= matchSchedule
//             matchesPerDay.push(matchSchedule)
//             teamNamePosition++;

//         }group.schedule.push(matchesPerDay);
//     }
    //console.log('ALL against ALL', group.schedule)
//}
// function allAgainstAllAlgorithm(group){
//     group.schedule = []
    
//     for (let i = 0; i < group.teams.length-1; i++){
//         const matchDay = [];
//         for( let j = 0; j <group.teams.length/2; j++){
//             const matches = ['localTeam', 'AwayTeam'];
//             matchDay.push(matches);

        
//         }group.schedule.push(matchDay)
//     }
// }

//omplim l'array schedule amb l'objecte match buit
function allAgainstAll(group){
    group.schedule = [];

    for (let i = 0; i < group.teams.length-1; i++){
        const matchesPerDay = [];
        
        for( let j = 0; j <group.teams.length/2; j++){
            const matchPerDay = Object.assign({}, match);
            matchesPerDay.push(matchPerDay);
            
        }group.schedule.push(matchesPerDay);
    }
}

//omplim l'objecte match amb els noms dels equips dins schedule
function setScheduleWithTeamsNames(group){
    const lasTeam = group.teams.length - 1;
    let indexTeamsAsc = 0;
    let indexTeamsDesc = group.teams.length - 2;

    for (let i = 0; i < group.teams.length-1; i++){
        for (let j = 0; j < group.teams.length /2; j++){
            if (indexTeamsAsc >= lasTeam){
                indexTeamsAsc = 0;
            }
            if (indexTeamsDesc < 0){
                indexTeamsDesc = group.teams.length - 2;
            }
            if (i % 2 != 0 && j == 0){
                group.schedule[i][j].localTeam = group.teams[lasTeam];
                group.schedule[i][j].awayTeam =  group.teams[indexTeamsAsc];
            }else if(j == 0){
                group.schedule[i][j].localTeam = group.teams[indexTeamsAsc];
                group.schedule[i][j].awayTeam =  group.teams[lasTeam];
            }else{
                group.schedule[i][j].localTeam = group.teams[indexTeamsAsc];
                group.schedule[i][j].awayTeam = group.teams[indexTeamsDesc];
            }
            if (j != 0){
                indexTeamsDesc --;
            }
            indexTeamsAsc ++;
        }
    }
}

// creen la planificació de partits per cada grup
export function scheduleMatches(groups){ 
    groups.forEach(group =>{

        allAgainstAll(group);
        setScheduleWithTeamsNames(group);

    })    
}
//generador de gols
function scoreGoals(){
    return Math.round(Math.random() * 5);
}

function findTeamInLeague(name){
    return leagueTeams.find(team => team.name === name)
}

function updateGoals(team, goalsFor, goalsAgainst){
    
    team.goalsFor += goalsFor;
    team.goalsAgainst += goalsAgainst;
}
    
function leagueUpdateScore(matchResult){
    const pointsPerWin = 3;
    const pointsPerDraw = 1;
    const pointsPerLose = 0;

    const localTeam= findTeamInLeague(matchResult.localTeam);
    const awayTeam= findTeamInLeague(matchResult.awayTeam);

    updateGoals(localTeam, matchResult.localGoals, matchResult.awayGoals);
    updateGoals(awayTeam, matchResult.awayGoals, matchResult.localGoals);

    if (matchResult.localGoals < matchResult.awayGoals){
        awayTeam.points += pointsPerWin; 
    }else if(matchResult.localGoals > matchResult.awayGoals){
        localTeam.points += pointsPerWin;
    }else{
        localTeam.points += pointsPerDraw;
        awayTeam.points += pointsPerDraw;
    }
}

// es juguen els partits establerts per cada dia
function playMatchesPerDay(matchesPerDay){
    for (let j = 0; j < matchesPerDay.length; j++){
        const localGoals = scoreGoals();
        const awayGoals = scoreGoals();

        matchesPerDay[j].localGoals = localGoals;
        matchesPerDay[j].awayGoals = awayGoals;

        leagueUpdateScore(matchesPerDay[j]);
    }
    console.log('per jornada')
    console.table(leagueTeams)
    
        
}
//es juga la fase de grups
export function startGroupStage(groups){
    
        for (let i = 0; i < _NUMBEROFTEAMSPERGROUP_ -1; i++){
            groups.forEach(group => {
                playMatchesPerDay(group.schedule[i]);
                console.table(group.schedule[i]);
            });
        }
        console.table(leagueTeams)
    

}
// for (let i = 0; i < 4; i++ ){
//     const teamsPerGroup = Object.assign({}, team)
//     teamsPerGroup.name = teamsNames[i]; 
//     groupA.push(teamsPerGroup)
// }


