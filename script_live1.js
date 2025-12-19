// ==========================================
// 1. GLOBAL HELPER FUNCTIONS
// ==========================================

const REFRESH_INTERVAL = 10000; // 10 seconds for Team Views
const MAIN_REFRESH_INTERVAL = 10000; // 10 seconds for Main Slides

// Helper: Refresh Iframe URL by updating timestamp
function refreshActiveIframe(iframe, label = "unknown") {
    if (!iframe) return;
    try {
        const url = new URL(iframe.src);
        url.searchParams.set('ts', new Date().getTime()); // Add timestamp to force reload
        iframe.src = url.toString();
        console.log(`Refreshed [${label}]:`, iframe.src);
    } catch (e) {
        console.error("Cannot refresh iframe (check same-origin policy or src):", e);
    }
}

// ==========================================
// 2. VIEW SELECTION & TEAM LOGIC
// ==========================================

const teamState = {
    'preliminary1': 0, 'preliminary2': 0, 'preliminary3': 0, 'preliminary4': 0,
    'preliminary1tie': 0, 'preliminary2tie': 0, 'preliminary3tie': 0, 'preliminary4tie': 0,
    'quarter': 0, 'quartertie': 0, 'semi': 0,
    'underdogs': 0, 'underdogstie': 0, 'final': 0, 
    'leaderboard': 0, 'structure': 0 
};

let currentTeamId = 'preliminary1'; 
let refreshIntervalId = null;

const teamSelector = document.getElementById('view-selector');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const allTeamViews = document.querySelectorAll('.view-section');

// --- Helper: Stop Timer for Team View ---
function stopRefresh() {
    if (refreshIntervalId !== null) {
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
}

// --- MAIN FUNCTION: UPDATE DISPLAY ---
function updateViewDisplay() {
    stopRefresh();

    // 1. Validate Container Exists
    const activeTeamContainer = document.getElementById(currentTeamId);
    if (!activeTeamContainer) {
        console.error(`ERROR: Container with ID "${currentTeamId}" not found in HTML.`);
        return;
    }

    // 2. Hide ALL view sections first
    allTeamViews.forEach(view => view.style.display = 'none');

    // 3. Show the ACTIVE container
    activeTeamContainer.style.display = 'block';

    // 4. Check for Pages (class="page")
    const pages = activeTeamContainer.querySelectorAll('.page');
    
    if (pages.length > 0) {
        // === LOGIC FOR MULTI-PAGE VIEWS (TEAMS) ===
        if (!teamState[currentTeamId]) teamState[currentTeamId] = 0;
        const currentIndex = teamState[currentTeamId];

        pages.forEach((page, index) => {
            if (index === currentIndex) {
                page.style.display = 'flex'; 
                
                // Find and refresh iframe in this page
                const iframe = page.querySelector('iframe');
                if (iframe) {
                    refreshActiveIframe(iframe, currentTeamId);
                    refreshIntervalId = setInterval(() => refreshActiveIframe(iframe, currentTeamId), REFRESH_INTERVAL);
                }
            } else {
                page.style.display = 'none';
            }
        });

        if (prevBtn) prevBtn.disabled = (currentIndex === 0);
        if (nextBtn) nextBtn.disabled = (currentIndex === pages.length - 1);

    } else {
        // === LOGIC FOR SINGLE VIEWS (LEADERBOARD / STRUCTURE) ===
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;

        const iframe = activeTeamContainer.querySelector('iframe');
        if (iframe) {
            refreshActiveIframe(iframe, currentTeamId);
            refreshIntervalId = setInterval(() => refreshActiveIframe(iframe, currentTeamId), REFRESH_INTERVAL);
        }
    }
}

// --- EVENT LISTENERS ---
if (teamSelector) {
    teamSelector.addEventListener('change', (e) => {
        currentTeamId = e.target.value;
        if (teamState[currentTeamId] !== undefined) teamState[currentTeamId] = 0;
        updateViewDisplay(); 
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const activeTeamContainer = document.getElementById(currentTeamId);
        if (!activeTeamContainer) return;
        const pages = activeTeamContainer.querySelectorAll('.page');
        if (pages.length > 0 && teamState[currentTeamId] < pages.length - 1) {
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

// Initialize on Load
window.addEventListener('load', () => {
    if (teamSelector) {
        currentTeamId = teamSelector.value;
        updateViewDisplay();
    }
});

// ==========================================
// 3. MAIN SLIDE ROTATION & REFRESH LOGIC
// ==========================================

const MAIN_SLIDES = ['main1', 'main2', 'main3'];
const MAIN_SWITCH_TIME = 5000; // Rotate every 5 seconds
let currentMainIndex = 0;

// Function 1: Toggle Visibility (Rotation)
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

// Function 2: Refresh All 3 Main Slides Simultaneously
function refreshAllMainSlides() {
    MAIN_SLIDES.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            const iframe = container.querySelector('iframe');
            if (iframe) {
                // Refresh, passing the ID as a label for the console log
                refreshActiveIframe(iframe, id);
            }
        }
    });
}

// Start Rotation Timer
setInterval(rotateMainContainers, MAIN_SWITCH_TIME);

// Start Refresh Timer (Independent of rotation)
setInterval(refreshAllMainSlides, MAIN_REFRESH_INTERVAL);