const getPopulationData = (data, populationData) => {
    data.forEach(location => {
        let population = parseInt(populationData.find(e => e.areaid == location.areaid).population);
        location["population"] = population;
        location["vaccinationsper100k-latest"] = parseFloat(((100000*location.daytotal)/population).toFixed(2));
        location["vaccinationsper100k-total"] = parseFloat(((100000*location.totalvaccinations)/population).toFixed(2));
    })

    return data;
}

module.exports = getPopulationData;