function updateCountdown() {
    const targetDate = new Date('2026-01-10T00:00:00');
    const now = new Date();
    const timeDiff = targetDate - now;

    if (timeDiff <= 0) {
        document.querySelector('.countdown').innerHTML = "Sales End!";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.querySelector('.countdown__days').innerText = days;
    document.querySelector('.countdown__hours').innerText = hours;
    document.querySelector('.countdown__minutes').innerText = minutes;
    document.querySelector('.countdown__seconds').innerText = seconds;
}


const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); 
