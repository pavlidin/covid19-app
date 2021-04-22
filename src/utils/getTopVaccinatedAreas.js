const getTopVaccinatedAreas = (data, number, time) => {
    if (time === 'latest') {
        data.sort(GetSortOrder("vaccinationsper100k-latest")); 
    } else {
        data.sort(GetSortOrder("vaccinationsper100k-total")); 
    }
    return data.slice(-number);
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

module.exports = getTopVaccinatedAreas;