
export function showGroupsAndTeams(groups){
    console.log('\nGrupos y equipos\n===============================');
    
    groups.forEach(group =>{
        console.log(`\nGroup ${group.name}\n---------------------`)
        group.teams.forEach(team  =>{
            console.log(team)
        });
        for (let i = 0; i <= 2; i++){
            console.log(`\nJornada ${i+1}:`)
            //console.log(`${group.schedule[i]}`)
            group.schedule[i].forEach(match =>{
                console.log(`- ${match.localTeam} vs ${match.awayTeam}`);
            });
        };
    });
}