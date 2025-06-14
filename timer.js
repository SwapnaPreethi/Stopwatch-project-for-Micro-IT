
document.addEventListener('DOMContentLoaded', function () {
    var countdownElement = document.getElementById('countdownTimer');
    var messageElement = document.getElementById('message');
    var startTimerBtn = document.getElementById('startTimerBtn');
    var pauseTimerBtn = document.getElementById('pauseTimerBtn');
    var resumeTimerBtn = document.getElementById('resumeTimerBtn');
    var datetimeInput = document.getElementById('datetimeInput');
    
    var countdownInterval;
    var countdownTargetTime;
    var remainingTime;
    var isPaused = false;

    // Start the countdown when the button is clicked
    startTimerBtn.addEventListener('click', function () {
        var selectedTime = datetimeInput.value;
        if (!selectedTime) {
            alert("Please select a date and time.");
            return;
        }

        countdownTargetTime = new Date(selectedTime).getTime();
        remainingTime = countdownTargetTime - Date.now(); // Calculate time difference
        if (remainingTime <= 0) {
            alert("The selected time is in the past!");
            return;
        }

        startTimer();
        startTimerBtn.disabled = true;
        pauseTimerBtn.disabled = false;
    });

    // Start the timer and update the countdown
    function startTimer() {
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Update the countdown every second
    function updateCountdown() {
        remainingTime = countdownTargetTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "00:00:00";
            messageElement.classList.remove('d-none');
            messageElement.classList.add('flash');
            return;
        }

        var hours = Math.floor(remainingTime / (1000 * 60 * 60));
        var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        // Format time in hh:mm:ss
        countdownElement.innerHTML = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Change color based on remaining time
        if (remainingTime <= 10000) { // Less than 10 seconds
            countdownElement.style.color = 'red';
        } else if (remainingTime <= 30000) { // Less than 30 seconds
            countdownElement.style.color = 'orange';
        } else {
            countdownElement.style.color = 'green';
        }
    }

    // Pause the countdown
    pauseTimerBtn.addEventListener('click', function () {
        clearInterval(countdownInterval);
        isPaused = true;
        pauseTimerBtn.disabled = true;
        resumeTimerBtn.disabled = false;
    });

    // Resume the countdown
    resumeTimerBtn.addEventListener('click', function () {
        if (isPaused) {
            startTimer();
            isPaused = false;
            pauseTimerBtn.disabled = false;
            resumeTimerBtn.disabled = true;
        }
    });
});

