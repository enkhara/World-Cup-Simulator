
function dividingLine(symbol, repeat = 20){
    console.log(symbol.repeat(repeat));
}

export function showGroupsAndTeams(groups){
    console.log('\nGrupos y equipos');
    dividingLine('=');
    
    groups.forEach(group =>{
        console.log(`\nGroup ${group.name}`)
        dividingLine('-')
        group.teams.forEach(team  =>{
            console.log(team)
        });
        for (let i = 0; i < group.teams.length - 1; i++){
            console.log(`\nJornada ${i+1}:`)
            //console.log(`${group.schedule[i]}`)
            group.schedule[i].forEach(match =>{
                console.log(`- ${match.localTeam} vs ${match.awayTeam}`);
            });
        };
    });
}

export function showTitleWorldCupStageBegins(title){
    const titleLenght = title.length
    console.log('\n')
    dividingLine('=', titleLenght + 14);
    console.log('='.repeat(6), title,'='.repeat(6))
    dividingLine('=', titleLenght + 14);
}

export function showMatchesAndStandings(group,  leagueTeams, jornada){

    const index = group.name.charCodeAt(0);
    const indexSliceInit = index - 65;
    const indexSliceEnd = indexSliceInit + 4;
    //console.log(matchesPerDay,'\n-----------------------------')
    console.log(`\nGrupo ${group.name} - Jornada ${jornada + 1}:`);
    dividingLine('-');
    group.schedule[jornada].forEach(match => {
        console.log(`${match.localTeam} ${match.localGoals} - ${match.awayGoals} ${match.awayTeam}`)
    });

    

    console.table(leagueTeams.slice(indexSliceInit, indexSliceEnd).map(team =>{
        return{
            Equipo: team.name,
            Puntos: team.points,
            GolesAFavor: team.goalsFor,
            GolesEnContra: team.goalsAgainst,
            DiferenciaDeGoles: team.goalsFor - team.goalsAgainst

        }
    }));
}