import { _NUMBEROFTEAMSPERGROUP_ } from './groups.js';
import { team, teamsNames } from './teams.js';
import { groups } from './index.js';
import { showMatchesAndStandings } from './consoleLog.js';

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
                group.schedule[i][j].localTeam = group.teams[lasTeam].name;
                group.schedule[i][j].awayTeam =  group.teams[indexTeamsAsc].name;
            }else if(j == 0){
                group.schedule[i][j].localTeam = group.teams[indexTeamsAsc].name;
                group.schedule[i][j].awayTeam =  group.teams[lasTeam].name;
            }else{
                group.schedule[i][j].localTeam = group.teams[indexTeamsAsc].name;
                group.schedule[i][j].awayTeam = group.teams[indexTeamsDesc].name;
            }
            if (j != 0){
                indexTeamsDesc --;
            }
            indexTeamsAsc ++;
        }
    }
}

// creen la planificació de partits per cada grup
export function scheduleMatches(){ 
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
function findTeamInGroup(name){
    // groups.forEach(group =>{
    //     const aux = group.teams.find(team => team.name === name)
    //     console.log(aux)
    //     return aux
    //     //return group.teams.find(team => team.name === name)
    // });
    let teamFound = null
    groups.forEach(group =>{
        group.teams.forEach(team =>{
            if (team.name === name){
                teamFound = team
                

            }
        })
        
    })
    return teamFound
    
    //return groups.find(group => group.teams.name === name)
}

//actualitzem els gols de cada equip
function updateGoals(team, goalsFor, goalsAgainst){
    team.goalsFor += goalsFor;
    team.goalsAgainst += goalsAgainst;
}

//actualitzem la puntuació de cada equip per partit
function groupUpdateScore(matchResult){
    const pointsPerWin = 3;
    const pointsPerDraw = 1;
    const pointsPerLose = 0;

    const localTeam= findTeamInGroup(matchResult.localTeam);
    const awayTeam= findTeamInGroup(matchResult.awayTeam);

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

        groupUpdateScore(matchesPerDay[j]);
    }
}

function getLeagueTeamsPerGroup(group){

    const index = group.name.charCodeAt(0);
    const indexSliceInit = index - 65;
    const indexSliceEnd = indexSliceInit + 4;

    const arrayOrdered = leagueTeams.slice(indexSliceInit, indexSliceEnd)

    arrayOrdered.sort(function (teamA, teamB) {
        if (teamA.points > teamB.points){
            return -1
        }else if (teamA.points < teamB.points){
            return 1
        }else{
            // group.schedule.forEach(match =>{
            //     if((match.localTeam == teamA && match.localTeam == teamB) || (match.localTeam == teamB && match.localTeam == teamA))
            //     console.log('partido de empate', match)
            // })
                //
            //}el equipo ganadar en encuentro directro
            //else if {

            
            //mejor diferencia de goles tenga
            //else
            //orden alfabético
            return 0
        }
    })



    return arrayOrdered
}

//es juga la fase de grups
export function startGroupStage(){
    for (let i = 0; i < _NUMBEROFTEAMSPERGROUP_ -1; i++){
        groups.forEach(group => {
            playMatchesPerDay(group.schedule[i]);
            getRanking(group)
            showMatchesAndStandings(group,i);
        });
    }
}

function checkDirectMatch(group, teamA, teamB){
    group.schedule.forEach(matchesDay =>{
        matchesDay.forEach(match =>{
            if (match.localTeam == teamA && match.awayTeam == teamB){
                if(match.localGoals > match.awayGoals){
                    return -1;
                }else if (match.localGoals < match.awayGoals){
                    return 1;
                }else{
                    return 0;
                }
            }
            if (match.localTeam == teamB && match.awayTeam == teamA){
                if(match.localGoals > match.awayGoals){
                    return 1;
                }else if (match.localGoals < match.awayGoals){
                    return -1;
                }else{
                    return 0;
                }
            }
        })
    })
}


function directMatchFinder(schedule, teamA, teamB){
    for (let i = 0; i < schedule.length; i ++){
        if (schedule[i].find(match => match.localTeam == teamA)){

        }
    }
}

function winnerPerGoalsFor(teamA, teamB){
    if(teamA.goalsFor - teamA.goalsAgainst > teamB.goalsFor - teamB.goalsAgainst){
        return -1;
    }else if(teamA.goalsFor - teamA.goalsAgainst < teamB.goalsFor - teamB.goalsAgainst){
        return 1;
    }else{
        return 0
    }
}

function orderTeamNamesAlphabetically(teamA, teamB){
    if (teamA < teamB){
        return -1;
    }else{
        return 1;
    }
}

function getRanking (group) {
    group.teams.sort(function (teamA, teamB) {
        if (teamA.points > teamB.points){
            return -1
        }else if (teamA.points < teamB.points){
            return 1
        }else{
            //teamA.points == teamB.points
            //enfrontament directe
            const match = directMatchFinder(group.schedule, teamA.name, teamB.name);
            const winnerDirectMatch = checkDirectMatch(group, teamA.name, teamB.name);
            
            if (winnerDirectMatch != 0){
                return winnerDirectMatch
            }else{
                //diferencia de gols
                const winnerPerGoalsFor = moreGoalsFor(teamA, teamB);
                if (winnerPerGoalsFor != 0 ){
                    return winnerPerGoalsFor;
                }else{
                    return orderTeamNamesAlphabetically(teamA.name, teamB.name);
                }
            } 
        }
    })
}

