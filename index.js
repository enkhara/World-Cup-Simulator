import { scheduleMatches, startGroupStage } from './groupstage.js';
import { showGroupsAndTeams, showTitleWorldCupStageBegins, showPlayOffRound, showWinnerWorldChampionTeam } from './consoleLog.js';
import { groupsCreator, playOffGroupBuilder } from './groups.js';
import { roundOfSixteen, playPlayOffRound } from './playoff.js';

export const groups = [];

function startWorldCupSimulator() {

    groupsCreator(groups);
    scheduleMatches();
    showGroupsAndTeams(groups);

    showTitleWorldCupStageBegins('COMIENZA EL MUNDIAL');
    startGroupStage();

    showTitleWorldCupStageBegins('COMIENZO DE LA FASE DE ELIMINATORIAS');
    const matchesPlayOff = playOffGroupBuilder(groups);
    
    showPlayOffRound('OCTAVOS DE FINAL');
    const winnersRoundOfSixteen = roundOfSixteen(matchesPlayOff);
    
    showPlayOffRound('CUARTOS DE FINAL');
    const winnersRoundOfQuarters = playPlayOffRound(winnersRoundOfSixteen);
    
    showPlayOffRound('SEMIFINALES');
    const winnersSemifinals = playPlayOffRound(winnersRoundOfQuarters);
    const thirdAndFourthPlace = winnersRoundOfQuarters.filter( winnerRoundOfQuarters => 
        winnerRoundOfQuarters != winnersSemifinals[0] && winnerRoundOfQuarters != winnersSemifinals[1]);
    
        showPlayOffRound('TERCER Y CUARTO PUESTO');
    playPlayOffRound(thirdAndFourthPlace);
    
    showPlayOffRound('FINAL');
    const winner = playPlayOffRound(winnersSemifinals);
    
    showWinnerWorldChampionTeam(winner);
}

startWorldCupSimulator();



