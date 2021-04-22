const getToday = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (yesterday.getDay() != 6) {
        return yesterday.toISOString().slice(0, -13) + '00:00:00'
    }
    return yesterday.setDate(yesterday.getDate() - 2).toISOString().slice(0, -13) + '00:00:00';
}

module.exports = getToday;