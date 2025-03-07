const days = document.querySelectorAll(".day")
const hours = document.querySelectorAll(".hour")
const minutes = document.querySelectorAll(".minute")
const seconds = document.querySelectorAll(".second")

const targetDate = new Date(2025, 3, 12, 20, 30);

function timer(){
    const currentDate = new Date();
    const distance = targetDate - currentDate;
    
    if (distance < 0) {
        days.innerHTML = "0";
        hours.innerHTML = "0";
        minutes.innerHTML = "0";
        seconds.innerHTML = "0";
    }

    days.forEach((day) => {
        day.innerHTML = Math.floor(distance / 1000 / 60 / 60 / 24)

    })

    hours.forEach((hour) => {
        hour.innerHTML = Math.floor(distance / 1000 / 60 / 60 ) % 24
    })

    minutes.forEach((minute) => {
        minute.innerHTML = Math.floor(distance / 1000 / 60) % 60    
    })

    seconds.forEach((second) => {
        second.innerHTML = Math.floor(distance / 1000) % 60
    })

}


setInterval(timer, 1000);
timer();