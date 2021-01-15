import axios from 'axios';
//creem objecte equip
export const team = {
    name: null,
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0
};

// export const teamsNames = [
//     'España',  'Australia', 'Chile', 'Paises Bajos',
//     'Brasil', 'Croacia', 'Mexico', 'Camerún',
//     'Colombia', 'Grecia',  'Costa de Marfil', 'Japón',
//     'Uruguay', 'Costa Rica', 'Inglaterra','Italia', 
//     'Suiza', 'Ecuador','Francia', 'Honduras',
//     'Argentina', 'Bosnia & H', 'Irán', 'Nigeria',
//     'Alemania', 'Portugal', 'Ghana', 'Estados Unidos', 
//     'Holanda', 'Algeria', 'Rusia', 'Korea'
// ];

function getTeamsNamesWithPromise() {
    const url = 'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.teams.json';
    console.log(url)
    return new Promise(function(resolve, reject){
        axios.get(url).then(function(response){
            resolve(response.data.teams);
        }, function(error){
            reject(error);
        })
    })
}

export const teamsNames = [];

try{
    const teams= await getTeamsNamesWithPromise();
    teams.forEach(team =>{
        teamsNames.push(team.name);
    })
}catch(error){
    console.log('El archivo con los nombres de los equipos no se ha podido cargar =>', error);
}


