import { group, _NUMBEROFTEAMSPERGROUP_} from './groups.js';
import {team, teamsNames} from './teams.js';
import {leagueTeams} from './index.js';
import {showMatchesAndStandings} from './consoleLog.js';

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

//busquem l'equip dins l'array leagueTeam
function findTeamInLeague(name){
    return leagueTeams.find(team => team.name === name)
}

//actualitzem els gols de cada equip
function updateGoals(team, goalsFor, goalsAgainst){
    team.goalsFor += goalsFor;
    team.goalsAgainst += goalsAgainst;
}

//actualitzem la puntuació de cada equip per partit
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
}

//es juga la fase de grups
export function startGroupStage(groups){
    for (let i = 0; i < _NUMBEROFTEAMSPERGROUP_ -1; i++){
        groups.forEach(group => {
            playMatchesPerDay(group.schedule[i]);
            showMatchesAndStandings(group, leagueTeams,i);
        });
    }
}



