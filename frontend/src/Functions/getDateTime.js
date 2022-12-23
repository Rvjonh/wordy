
const getDateTime =()=>{
    //ejmplod de formato  3/07/2022 5:30:30
    let currentDate = new Date();

    let cDay = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    let cYear = currentDate.getFullYear()

    let cHour = currentDate.getHours();
    let cMinutes = currentDate.getMinutes();
    let cSeconds = currentDate.getSeconds();

    return `${cDay}/${cMonth}/${cYear} ${cHour}:${cMinutes}:${cSeconds}`;
}

export { getDateTime };