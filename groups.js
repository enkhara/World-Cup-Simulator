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

