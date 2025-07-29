function date(){
    var today = new Date();
    let day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][today.getDay()]
    let date = today.getDate()
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][today.getMonth()]
    let year = today.getFullYear()
    document.querySelector('.day-name').innerHTML = day
    document.querySelector('.day-number').innerHTML = date
    document.querySelector('.month-name').innerHTML = month
    document.querySelector('.year').innerHTML = year
}

document.addEventListener("DOMContentLoaded",date)
