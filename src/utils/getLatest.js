const getLatest = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (yesterday.getDay() === 6) {
        return yesterday.setDate(yesterday.getDate() - 1).toISOString().slice(0, -13) + '00:00:00';
    }
    return yesterday.toISOString().slice(0, -13) + '00:00:00'
}

module.exports = getLatest;