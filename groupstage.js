import { _NUMBEROFTEAMSPERGROUP_ } from './groups.js';
import { groups } from './index.js';
import { showMatchesAndStandings } from './consoleLog.js';

const match ={
    localTeam: null,
    awayTeam: null,
    localGoals: 0,
    awayGoals: 0
}

export function matchScheme(matchNumber){
    const matchesScheme = [];
    for( let j = 0; j <matchNumber; j++){
        const matchScheme = Object.assign({}, match);
        matchesScheme.push(matchScheme);
    } return(matchesScheme)
}

//omplim l'array schedule amb l'objecte match buit
function allAgainstAll(group){
    group.schedule = [];

    for (let i = 0; i < group.teams.length-1; i++){
        const matchesPerDay = matchScheme(group.teams.length/2);
        group.schedule.push(matchesPerDay);
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
    let teamFound = null
    groups.forEach(group =>{
        group.teams.forEach(team =>{
            if (team.name === name){
                teamFound = team
            }
        })
    })
    return teamFound
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

export function playMatches(matchResult){
    const localGoals = scoreGoals();
    const awayGoals = scoreGoals();

    matchResult.localGoals = localGoals;
    matchResult.awayGoals = awayGoals;

    return matchResult
}

// es juguen els partits establerts per cada dia
function playMatchesPerDay(matchesPerDay){
    for (let j = 0; j < matchesPerDay.length; j++){
        // const localGoals = scoreGoals();
        // const awayGoals = scoreGoals();

        // matchesPerDay[j].localGoals = localGoals;
        // matchesPerDay[j].awayGoals = awayGoals;
        
        //groupUpdateScore(matcherPerDay[j]);
        //matchesPerDay[j]= playMatchesPerDay(matchesPerDay[j])
        groupUpdateScore(playMatches(matchesPerDay[j]));
    }
}

function checkMatchResult(match){
    if (match.localGoals > match.awayGoals){
        return -1;
    }else if (match.localGoal < match.awayGoals){
        return 1;
    }else{
        return 0;
    }
}

function checkDirectMatch(schedule, teamA, teamB){
    let winner = undefined;
    let found = false;
    let i = 0;
    do {
        
        for (let j = 0; j < schedule[i].length; j++) {
            if (schedule[i][j].localTeam == teamA || schedule[i][j].localTeam == teamB){
                if (schedule[i][j].awayTeam == teamB || schedule[i][j].awayTeam == teamA){
                    winner = checkMatchResult(schedule[i][j])
                    
                    if (schedule[i][j].localTeam == teamB){
                        winner *= -1;
                    }
                    
                    found = true;
                }
            }
        }
        i ++;
        
    } while (found == false && i <schedule.length );
    return winner
}
        
function teamWithMoreGoalsFor(teamA, teamB){
    if(teamA.goalsFor - teamA.goalsAgainst > teamB.goalsFor - teamB.goalsAgainst){
        return -1;
    }else if(teamA.goalsFor - teamA.goalsAgainst < teamB.goalsFor - teamB.goalsAgainst){
        return 1;
    }else{
        return 0
    }
}

function orderTeamNamesAlphabetically(teamA, teamB){
    if (teamA.toLowerCase() < teamB.toLowerCase()){
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
            //enfrontament directe
            const winnerDirectMatch = checkDirectMatch(group.schedule, teamA.name, teamB.name);

            if (winnerDirectMatch != 0){
                return winnerDirectMatch
            }else{
                //diferencia de gols
                const winnerByGoalsFor = teamWithMoreGoalsFor(teamA, teamB);
                if (winnerByGoalsFor != 0 ){
                    return winnerByGoalsFor;
                }else{
                    // ordre alfabètic
                    return orderTeamNamesAlphabetically(teamA.name, teamB.name);
                }
            } 
        }
    })
}

export function startGroupStage(){
    for (let i = 0; i < _NUMBEROFTEAMSPERGROUP_ -1; i++){
        groups.forEach(group => {
            playMatchesPerDay(group.schedule[i]);
            getRanking(group)

            showMatchesAndStandings(group,i);
        });
    }
}