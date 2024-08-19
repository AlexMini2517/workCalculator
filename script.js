function calculateEarnings() {
    const morningStart = parseTime(document.getElementById('start-time-morning').value); // 10:30
    const morningEnd = parseTime(document.getElementById('end-time-morning').value); // 13:30
    const afternoonStart = parseTime(document.getElementById('start-time-afternoon').value); // 14:30
    const afternoonEnd = parseTime(document.getElementById('end-time-afternoon').value); // 19:30
    const startingDate = new Date(document.getElementById('starting-day').value).getDate(); // 1-31

    const currentTime = new Date(); // Date Mon Jan 01 2024 00:00:00
    const currentMonth = currentTime.getMonth(); // 0-11
    const currentDay = currentTime.getDate(); // 1-31
    const dayOfWeek = currentTime.getDay(); // sunday = 0, monday = 1, ..., saturday = 6

    // Calcola le ore lavorate nel turno di mattina
    let totalHoursWorked = 0;
    if (dayOfWeek == 6 || dayOfWeek == 0) { // if it's a saturday (6) or sunday (0)
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
    }
    const earnings = (totalHoursWorked * hourlyRate).toFixed(2);

    // Calcola il guadagno totale fino ad oggi
    let totalAssumedEarnings = 0;
    for (let day = startingDate; day < currentDay; day++) {
        const date = new Date(currentTime.getFullYear(), currentMonth, day);
        const dayOfWeek = date.getDay();

        if (dayOfWeek == 6 || dayOfWeek == 0) { // if it's a saturday (6) or sunday (0)
            totalAssumedEarnings += ((morningEnd - morningStart) + (afternoonEnd - afternoonStart)) / 1000 / 60 / 60 * hourlyRate;
        }
    }
    totalAssumedEarnings += parseFloat(earnings);

    document.getElementById('earnings').innerText = earnings;
    document.getElementById('assumed-earnings').innerText = totalAssumedEarnings.toFixed(2);
}

function parseTime(timeString) {
    const timeParts = timeString.split(':');
    const time = new Date();
    time.setHours(timeParts[0], timeParts[1], 0);
    return time;
}

document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('hourly-rate').value = '7.68';
    document.getElementById('start-time-morning').value = '10:30';
    document.getElementById('end-time-morning').value = '13:30';
    document.getElementById('start-time-afternoon').value = '14:30';
    document.getElementById('end-time-afternoon').value = '19:30';
    document.getElementById('starting-day').value = new Date().toISOString().split('T')[0];
    document.getElementById('earnings').innerText = '0.00';
    document.getElementById('assumed-earnings').innerText = '0.00';
    console.log(new Date().toISOString().split('T')[0]);
});

let hourlyRate = parseFloat(document.getElementById('hourly-rate').value);
document.getElementById('starting-day').value = new Date().toISOString().split('T')[0]; // set the starting day to today
document.getElementById('hourly-rate').addEventListener('input', () => {
    hourlyRate = parseFloat(document.getElementById('hourly-rate').value);
});

setInterval(calculateEarnings, 1000);