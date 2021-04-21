const getUniqueAreas = (data) => {
    const lookup = {};
    const uniqueAreas = [];

    for (let item, i = 0; item = data[i++];) {
        const area = item.area;
        const areaid = item.areaid;

        if (!(area in lookup)) {
            lookup[area] = 1;
            uniqueAreas.push({ area, areaid });
        }
    }
    return uniqueAreas;
}

module.exports = getUniqueAreas;