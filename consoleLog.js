
export function showGroupsAndTeams(groups){
    console.log('\nGrupos y equipos\n===============================');
    
    groups.forEach(group =>{
        console.log(`\nGroup ${group.name}\n---------------------`)
        group.teams.forEach(team  =>{
            console.log(team)
        })
        for (let i = 1; i <= 3; i++){
            console.log('\nJornada\n', i)
            console.log(`${group.schedule.match}`)
        }
        
    })
}