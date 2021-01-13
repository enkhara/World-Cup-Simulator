
import {playMatches} from './league.js'

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

export function roundOfSixteen(matchesPlayOff){
    const winnersRoundOfSixteen = [];
    matchesPlayOff.forEach(matchPlayOff =>{
        playPlayOffMatch(matchPlayOff);
        winnersRoundOfSixteen.push(selectWinnersPerRound(matchPlayOff));
    })
    return winnersRoundOfSixteen;
}