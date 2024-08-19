function calculateEarnings() {
    const currentTime = new Date();

    const morningStart = parseTime(document.getElementById('start-time-morning').value);
    const morningEnd = parseTime(document.getElementById('end-time-morning').value);
    const afternoonStart = parseTime(document.getElementById('start-time-afternoon').value);
    const afternoonEnd = parseTime(document.getElementById('end-time-afternoon').value);

    let totalHoursWorked = 0;

    // Calcola le ore lavorate nel turno di mattina
    if (currentTime > morningStart && currentTime < morningEnd) {
        totalHoursWorked += (currentTime - morningStart) / 1000 / 60 / 60;
    } else if (currentTime >= morningEnd) {
        totalHoursWorked += (morningEnd - morningStart) / 1000 / 60 / 60;
    }

    // Calcola le ore lavorate nel turno di pomeriggio
    if (currentTime > afternoonStart && currentTime < afternoonEnd) {
        totalHoursWorked += (currentTime - afternoonStart) / 1000 / 60 / 60;
    } else if (currentTime >= afternoonEnd) {
        totalHoursWorked += (afternoonEnd - afternoonStart) / 1000 / 60 / 60;
    }

    const earnings = (totalHoursWorked * hourlyRate).toFixed(2);
    document.getElementById('earnings').innerText = earnings;
}

function parseTime(timeString) {
    const timeParts = timeString.split(':');
    const time = new Date();
    time.setHours(timeParts[0], timeParts[1], 0);
    return time;
}

document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('hourly-rate').value = '7.68';
    document.getElementById('start-time-morning').value = '09:30';
    document.getElementById('end-time-morning').value = '13:30';
    document.getElementById('start-time-afternoon').value = '14:30';
    document.getElementById('end-time-afternoon').value = '19:30';
    document.getElementById('earnings').innerText = '0.00';
});

let hourlyRate = parseFloat(document.getElementById('hourly-rate').value);

document.getElementById('hourly-rate').addEventListener('input', () => {
    hourlyRate = parseFloat(document.getElementById('hourly-rate').value);
});

setInterval(calculateEarnings, 1000);