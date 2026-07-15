let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 1;

const display =
document.querySelector(".time-display");

const progress =
document.querySelector(".progress");

const laps =
document.getElementById("laps");

const circumference = 879.6;

progress.style.strokeDasharray = circumference;
progress.style.strokeDashoffset = circumference;

function updateTime() {

    const currentTime =
    Date.now() - startTime;

    const hours =
    Math.floor(currentTime / 3600000);

    const minutes =
    Math.floor((currentTime % 3600000) / 60000);

    const seconds =
    Math.floor((currentTime % 60000) / 1000);

    const milliseconds =
    Math.floor(currentTime % 1000);

    display.textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}.` +
        `${String(milliseconds).padStart(3, "0")}`;

    const progressValue =
        ((seconds % 60) + milliseconds / 1000) / 60;

    progress.style.strokeDashoffset =
        circumference -
        (circumference * progressValue);
}

function startStopwatch() {

    if (timerInterval) return;

    startTime = Date.now() - elapsedTime;

    timerInterval =
    setInterval(updateTime, 10);
}

function pauseStopwatch() {

    if (!timerInterval) return;

    clearInterval(timerInterval);

    elapsedTime =
    Date.now() - startTime;

    timerInterval = null;
}

function resetStopwatch() {

    clearInterval(timerInterval);

    timerInterval = null;

    startTime = 0;
    elapsedTime = 0;
    lapCount = 1;

    display.textContent =
    "00:00:00.000";

    progress.style.strokeDashoffset =
    circumference;

    laps.innerHTML = "";
}

function addLap() {

    if (!timerInterval) return;

    const li =
    document.createElement("li");

    li.textContent =
    `Lap ${lapCount} - ${display.textContent}`;

    laps.prepend(li);

    lapCount++;
}

/* Button Events */

document
.getElementById("startBtn")
.addEventListener("click", startStopwatch);

document
.getElementById("pauseBtn")
.addEventListener("click", pauseStopwatch);

document
.getElementById("resetBtn")
.addEventListener("click", resetStopwatch);

document
.getElementById("lapBtn")
.addEventListener("click", addLap);

/* Keyboard Shortcuts */

document.addEventListener("keydown", (e) => {

    const key = e.key.toLowerCase();

    // Space = Start / Pause
    if (key === " " || e.code === "Space") {

        e.preventDefault();

        if (timerInterval) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    }

    // L = Lap
    if (key === "l") {
        addLap();
    }

    // R = Reset
    if (key === "r") {
        resetStopwatch();
    }
});