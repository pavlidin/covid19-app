const getVaccinatedAreas = (data, limit, sort, time) => {
    if (time === 'latest') {
        data.sort(GetSortOrder("latestVaccinationsPer100k")); 
    } else {
        data.sort(GetSortOrder("totalVaccinationsPer100k")); 
    }

    if (sort === 'desc') {
        return data.slice(-limit);
    } else if (sort === 'asc') {
        return data.slice(0, limit);
    }
}

//Comparer Function
const GetSortOrder = (prop) => {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}

module.exports = getVaccinatedAreas;