const convertDate = (date) => {
    const dtf = new Intl.DateTimeFormat(
        'ru',
        {year: 'numeric', month: 'long', day: 'numeric'}
    );
    const [
        {value: day},
        ,
        {value: month},
        ,
        {value: year},
    ] = dtf.formatToParts(new Date(date));

    return `${day} ${month} ${year}`;
};

export default convertDate;
