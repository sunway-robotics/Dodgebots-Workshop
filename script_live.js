// ==========================================
// 1. FOOTER TIMER LOGIC (With Alarm)
// ==========================================

const START_MINUTES = 3; 
let timeLeft = START_MINUTES * 60;
let timerInterval = null;
let isTimerRunning = false;

// DOM Elements
const timerDisplay = document.getElementById('timer-display'); 
const toggleBtn = document.getElementById('timer-toggle');     
const timerContainer = document.querySelector('.timer-minimal');
const alarmSound = document.getElementById('timer-sound'); // The Audio Element

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    if (timerDisplay) {
        timerDisplay.innerText = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
}

function toggleTimer() {
    if (timeLeft <= 0) { resetTimer(); return; }

    if (isTimerRunning) {
        // PAUSE
        clearInterval(timerInterval);
        isTimerRunning = false;
        toggleBtn.innerText = "Start";
        timerContainer.classList.remove('timer-running');
    } else {
        // START
        isTimerRunning = true;
        toggleBtn.innerText = "Pause";
        timerContainer.classList.add('timer-running');

        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                // TIME IS UP!
                clearInterval(timerInterval);
                isTimerRunning = false;
                
                // Visual Updates
                timerContainer.classList.remove('timer-running');
                timerContainer.classList.add('timer-done'); 
                toggleBtn.innerText = "Stop";

                // Audio Trigger
                if (alarmSound) {
                    alarmSound.currentTime = 0; // Rewind to start
                    alarmSound.play().catch(error => console.log("Audio blocked:", error));
                }
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timeLeft = START_MINUTES * 60;
    updateTimerDisplay();
    
    // Stop Audio if it's playing
    if (alarmSound) {
        alarmSound.pause();
        alarmSound.currentTime = 0; // Rewind
    }
    
    // Reset Visuals
    toggleBtn.innerText = "Start";
    timerContainer.classList.remove('timer-running', 'timer-done');
}

// Initialize
updateTimerDisplay();

// ==========================================
// 2. VIEW & IFRAME REFRESH LOGIC
// ==========================================

const REFRESH_INTERVAL = 10000; // 10 seconds

const teamState = {
    'preliminary1': 0, 'preliminary2': 0, 'preliminary3': 0, 'preliminary4': 0,
    'preliminary1tie': 0, 'preliminary2tie': 0, 'preliminary3tie': 0, 'preliminary4tie': 0,
    'quarter': 0, 'quartertie': 0, 'semi': 0,
    'underdogs': 0, 'underdogstie': 0, 'final': 0
};

let currentTeamId = 'preliminary1'; 
let refreshIntervalId = null;

const teamSelector = document.getElementById('view-selector');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const allTeamViews = document.querySelectorAll('.view-section');

function refreshActiveIframe(iframe) {
    if (!iframe) return;
    try {
        const url = new URL(iframe.src);
        url.searchParams.set('ts', new Date().getTime()); 
        iframe.src = url.toString();
    } catch (e) {
        console.error("Error refreshing iframe:", e);
    }
}

function stopRefresh() {
    if (refreshIntervalId !== null) {
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
}

// RENAMED FUNCTION to avoid conflict with Timer
function updateViewDisplay() {
    stopRefresh();

    // Hide ALL team views
    allTeamViews.forEach(view => view.style.display = 'none');

    // Show active team
    const activeTeamContainer = document.getElementById(currentTeamId);
    if (!activeTeamContainer) return;

    activeTeamContainer.style.display = 'block';

    const pages = activeTeamContainer.querySelectorAll('.page');
    const currentIndex = teamState[currentTeamId];

    pages.forEach((page, index) => {
        if (index === currentIndex) {
            page.style.display = 'flex';
            const iframe = page.querySelector('iframe');
            if (iframe) {
                refreshActiveIframe(iframe);
                refreshIntervalId = setInterval(() => {
                    refreshActiveIframe(iframe);
                }, REFRESH_INTERVAL);
            }
        } else {
            page.style.display = 'none';
        }
    });

    if (prevBtn) prevBtn.disabled = (currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentIndex === pages.length - 1);
}

// Event Listeners for View Switching
if (teamSelector) {
    teamSelector.addEventListener('change', (e) => {
        currentTeamId = e.target.value;
        updateViewDisplay(); 
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const activeTeamContainer = document.getElementById(currentTeamId);
        const pages = activeTeamContainer.querySelectorAll('.page');
        if (teamState[currentTeamId] < pages.length - 1) {
            teamState[currentTeamId]++;
            updateViewDisplay();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (teamState[currentTeamId] > 0) {
            teamState[currentTeamId]--; 
            updateViewDisplay();
        }
    });
}

// Initialize View on Load
if (teamSelector) {
    currentTeamId = teamSelector.value;
    updateViewDisplay();
}

// ==========================================
// 3. MAIN SLIDE ROTATION LOGIC
// ==========================================

const MAIN_SLIDES = ['main1', 'main2', 'main3'];
const MAIN_SWITCH_TIME = 5000; 
let currentMainIndex = 0;

function rotateMainContainers() {
    MAIN_SLIDES.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = 'none';
    });

    currentMainIndex++;
    if (currentMainIndex >= MAIN_SLIDES.length) {
        currentMainIndex = 0; 
    }

    const nextId = MAIN_SLIDES[currentMainIndex];
    const nextEl = document.getElementById(nextId);
    if(nextEl) nextEl.style.display = 'block';
}

setInterval(rotateMainContainers, MAIN_SWITCH_TIME);