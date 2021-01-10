import {team, teamsNames} from './teams.js'
import {auxLeague} from './index.js'

export const _NUMBEROFTEAMSPERGROUP_ = 4;

Array.prototype.shuffle = function()
{
    var i = this.length;
	while (i)
	{
        var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
}

export const group = {
    name: null,
    teams: [],
    schedule: [],
    }

//barrejem equips
teamsNames.shuffle();
//calculem número de grups que shan de crear
const numberOfGroups = teamsNames.length / _NUMBEROFTEAMSPERGROUP_;


//crea un grup amb 4 equips
// function teamsGroup(index) {
//     const indexSliceInit = index * _NUMBEROFTEAMSPERGROUP_;
//     const indexSliceEnd = _NUMBEROFTEAMSPERGROUP_ + indexSliceInit;

//     const group = teamsNames.slice(indexSliceInit, indexSliceEnd);

//     return group;
// }

// function teamsGroup2(index) {
//     const indexSliceInit = index * _NUMBEROFTEAMSPERGROUP_;
//     const indexSliceEnd = _NUMBEROFTEAMSPERGROUP_ + indexSliceInit;

//     const groupTeams = Object.assign({}, group);
//     groupTeams.teams = teamsNames.slice(indexSliceInit, indexSliceEnd);
//     //codigo ascii para las letras mayúsculas
//     groupTeams.name = String.fromCharCode( index + 65 );
//     auxLeague.push(groupTeams.name)
//     return groupTeams;
// }
//omplim group.teams amb l'objecte team
function registerTeamsToTheGroup( teamsNames){
    
    const groupConstructor = Object.assign({}, group); 
    teamsNames.forEach(teamName =>{
    const teamPerGroup = Object.assign({}, team);
    teamPerGroup.name = teamName;
    groupConstructor.teams.push(teamPerGroup)
    })
    return groupConstructor
}

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
    auxLeague.push(groupTeams.name)
    return groupTeams;
}

//llena los grupos con en numero de equipos definido
export default function groupsCreator(groups){

    for (let i = 0 ; i < numberOfGroups; i++ ) {
        groups.push(teamsGroup(i));
    } 
    return groups;
}


