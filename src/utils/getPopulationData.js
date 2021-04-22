const getPopulationData = (data, populationData) => {
    data.forEach(json => {
        let population = parseInt(populationData.find(e => e.areaid == json.areaid).population);
        json["population"] = population;
        json["vaccinationsper100k-latest"] = parseFloat(((100000*json.daytotal)/population).toFixed(2));
        json["vaccinationsper100k-total"] = parseFloat(((100000*json.totalvaccinations)/population).toFixed(2));
    })

    return data;
}

module.exports = getPopulationData;