

// const numberOfTeamsPerGroup = 4;

// const league = {
//     howManyLeagues: 
// }

// function howManyLeagues (numberOfTeams){

// }

export class League {
    constructor(name, rounds, teams= []){
        this.name = name;
        this.rounds = rounds;
        this.setupTeams(teams);
    }

    setupTeams(teams){
        this.teams = []

        for (const team of teams){
            this.team.push(createTeam(team));
        }
    }
    createTeam(team){
        return {
            name: team,
            pointsPerWin: 0,
            pointsPerDraw: 0,
            pointsPerLose: 0,
            goalsFor: 0,
            goalsAgainst: 0
        }
    }
}