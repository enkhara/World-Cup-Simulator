
import { showMatchesAndWinnersPerRound } from './consoleLog.js';
import { playMatches, matchScheme } from './groupstage.js';

function playPlayOffMatch(match){
    playMatches(match);
        let drawMatch = true;
        while (drawMatch) {
            if (match.localGoals == match.awayGoals){
                playMatches(match);
            }else {
                drawMatch = false;
            }
        }
}

function selectWinnersPerRound(match){
    let teamWinner = undefined;
    if (match.awayGoals < match.localGoals){
        teamWinner = match.localTeam;
    }else{
        teamWinner = match.awayTeam;
    }
    return teamWinner;
}

function playRound(matchesPlayOff, winnersPerRound){
    matchesPlayOff.forEach(matchPlayOff =>{
        playPlayOffMatch(matchPlayOff);
        winnersPerRound.push(selectWinnersPerRound(matchPlayOff));
    })
    return winnersPerRound;

}

export function roundOfSixteen(matchesPlayOff){
    const winnersRoundOfSixteen = [];
    playRound(matchesPlayOff, winnersRoundOfSixteen);
    showMatchesAndWinnersPerRound(matchesPlayOff, winnersRoundOfSixteen);
    return winnersRoundOfSixteen;
}

export function playPlayOffRound(winnerLastRound){
    const winnersPerRound = [];
    const matchesPerRound = matchScheme(winnerLastRound.length/2);
    let j = 0;
    for(let i = 0; i < matchesPerRound.length; i ++) {
        matchesPerRound[i].localTeam = winnerLastRound[j];
        matchesPerRound[i].awayTeam = winnerLastRound[j+1];
        j += 2;
    }
    playRound(matchesPerRound, winnersPerRound);
    showMatchesAndWinnersPerRound(matchesPerRound, winnersPerRound);

    return winnersPerRound;
}

