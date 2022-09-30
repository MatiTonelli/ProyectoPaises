const axios = require('axios');

const getCountries = async () => {
    let paises = await axios.get('https://restcountries.com/v3/all');
    let data = await paises.data.map(c => {
        return {
            id: c.cca3,
            name: c.name.common,
            flag: c.flags[1],
            continent: c.region,
            capital: c.capital ? c.capital[0] : "don't have capital",
            subregion: c.subregion,
            area: c.area,
            poblacion: c.population
        }
    });
    return data;

}



module.exports = {
    getCountries
}