const TRACK_LENGTH = 70;

const startBtn = document.getElementById("startBtn");
const messageEl = document.getElementById("message");
const trackEl = document.getElementById("track");

const tortoiseScoreEl = document.getElementById("tortoiseScore");
const hareScoreEl = document.getElementById("hareScore");

let tortoisePosition = 1;
let harePosition = 1;
let raceIntervalId = null;
let stepCount = 0;

let tortoiseWins = 0;
let hareWins = 0;

startBtn.addEventListener("click", startRace);

function startRace() {
    tortoisePosition = 1;
    harePosition = 1;
    stepCount = 0;

    messageEl.textContent = "BANG!!! AND THEY ARE OFF!!!";
    startBtn.disabled = true;

    if (raceIntervalId !== null) {
        clearInterval(raceIntervalId);
    }

    renderTrack();

    raceIntervalId = setInterval(raceStep, 1000);
}

function raceStep() {
    stepCount++;

    moveTortoise();
    moveHare();
    clampPositions();

    renderTrack();

    if (tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH) {
        clearInterval(raceIntervalId);
        raceIntervalId = null;
        showResult();
        startBtn.disabled = false;
    }
}

function moveTortoise() {
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 5) {
        tortoisePosition += 4;
    } else if (roll >= 6 && roll <= 7) {
        tortoisePosition -= 5;
    } else {
        tortoisePosition += 1;
    }
}

function moveHare() {
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 2) {
        // sleep: no move
    } else if (roll >= 3 && roll <= 4) {
        harePosition += 9;
    } else if (roll >= 5 && roll <= 6) {
        harePosition -= 12;
    } else if (roll >= 7 && roll <= 8) {
        harePosition += 2;
    } else {
        harePosition -= 4;
    }
}

function clampPositions() {
    tortoisePosition = Math.min(TRACK_LENGTH, Math.max(1, tortoisePosition));
    harePosition = Math.min(TRACK_LENGTH, Math.max(1, harePosition));
}

function renderTrack() {
    trackEl.innerHTML = "";

    for (let i = 1; i <= TRACK_LENGTH; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        let isTortoiseHere = tortoisePosition === i;
        let isHareHere = harePosition === i;

        if (isTortoiseHere && isHareHere) {
            cell.classList.add("both");
            cell.textContent = "💥";
        } else if (isTortoiseHere) {
            cell.classList.add("tortoise");
            cell.textContent = "🐢";
        } else if (isHareHere) {
            cell.classList.add("hare");
            cell.textContent = "🐇";
        }

        trackEl.appendChild(cell);
    }
}

function updateScoreboard() {
    tortoiseScoreEl.textContent = `Tortoise: ${tortoiseWins} wins`;
    hareScoreEl.textContent = `Hare: ${hareWins} wins`;
}

function showResult() {
    if (tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH) {
        messageEl.textContent = "It's a tie!!";
    } else if (tortoisePosition >= TRACK_LENGTH) {
        tortoiseWins++;
        updateScoreboard();
        messageEl.textContent = "Tortoise wins!";
    } else if (harePosition >= TRACK_LENGTH) {
        hareWins++;
        updateScoreboard();
        messageEl.textContent = "Hare wins!";
    } else {
        messageEl.textContent = "Race stopped....";
    }
}

renderTrack();
updateScoreboard();