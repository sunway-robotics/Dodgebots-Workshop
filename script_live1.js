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