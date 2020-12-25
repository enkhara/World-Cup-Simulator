import {team, teamsNames} from './teams.js'

const _NUMBEROFTEAMSPERGROUP_ = 4;

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
//barrejem equips
teamsNames.shuffle();
//calculem número de grups que shan de crear
const numberOfGroups = teamsNames.length / _NUMBEROFTEAMSPERGROUP_;
const groups = [];

// function leaguesNames(numberOfGroups) {
//     const leagueNames = [];
//     for (let i = 65; i < numberOfGroups + 65; i ++){
//         leagueNames.push(String.fromCharCode(i));
//     }
//     console.log (`aux ${leagueNames} ` );
//     return leagueNames;
// }
//const names = leaguesNames(groups);

function teamsGroup(index) {
    const indexSliceInit = index * _NUMBEROFTEAMSPERGROUP_;
    const indexSliceEnd = _NUMBEROFTEAMSPERGROUP_ + indexSliceInit;

    const group = teamsNames.slice(indexSliceInit, indexSliceEnd);

    return group;
}



function creatorGroups(numberOfGroups){
    for (let i = 0 ; i < numberOfGroups; i++ ) {
        groups.push(teamsGroup(i));
    } 
    return groups;
}

creatorGroups(numberOfGroups);
console.log(teamsNames);
console.table(groups);