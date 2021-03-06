import { team, teamsNames } from './teams.js'
import { matchScheme } from './groupstage.js'


export const _NUMBEROFTEAMSPERGROUP_ = 4;

// Array.prototype.shuffle = function()
// {
//     var i = this.length;
// 	while (i)
// 	{
//         var j = Math.floor(Math.random() * i);
// 		var t = this[--i];
// 		this[i] = this[j];
// 		this[j] = t;
// 	}
// 	return this;
// }

export const group = {
    name: null,
    teams: [],
    schedule: [],
    }

//barrejem equips
//teamsNames.shuffle();
//calculem número de grups que shan de crear
const numberOfGroups = teamsNames.length / _NUMBEROFTEAMSPERGROUP_;

function teamsGroup(index) {
    const indexSliceInit = index * _NUMBEROFTEAMSPERGROUP_;
    const indexSliceEnd = _NUMBEROFTEAMSPERGROUP_ + indexSliceInit;
    const groupTeams = Object.assign({}, group);

    groupTeams.teams = [];
    teamsNames.slice(indexSliceInit, indexSliceEnd).forEach(teamName =>{
        const teamPerGroup = Object.assign({}, team);
        teamPerGroup.name = teamName;
        groupTeams.teams.push(teamPerGroup);
    });
    //codigo ascii para las letras mayúsculas
    groupTeams.name = String.fromCharCode( index + 65 );

    return groupTeams;
}

//llena los grupos con en numero de equipos definido
export function groupsCreator(groups){

    for (let i = 0 ; i < numberOfGroups; i++ ) {
        groups.push(teamsGroup(i));
    } 
    return groups;
}

export function playOffGroupBuilder (groups){
    
    const playOffScheduler = matchScheme(groups.length);
    let indexGroupA = 0;
    let indexGroupB = groups.length / 2;
    let j = 1;
    for (let i =0; i <= groups.length-1; i = i+2){
        
        playOffScheduler[indexGroupA].localTeam = groups[i].teams[0].name
        playOffScheduler[indexGroupA].awayTeam = groups[j].teams[1].name
        playOffScheduler[indexGroupB].awayTeam = groups[i].teams[1].name
        playOffScheduler[indexGroupB].localTeam = groups[j].teams[0].name
        
        indexGroupA ++;
        indexGroupB ++;

        j = j + 2;
    } return playOffScheduler
}
