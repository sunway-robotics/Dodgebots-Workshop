// --- CONFIGURATION ---
const REFRESH_INTERVAL = 10000; // 10 seconds

// --- STATE MANAGEMENT ---
// We track the current page index for every team separately
// Example: { 'team-alpha': 1, 'team-beta': 0, 'team-gamma': 0 }
const teamState = {
    'preliminary1': 0,
    'preliminary2': 0,
    'preliminary3': 0,
    'preliminary4': 0,
    'quarter': 0,
    'semi': 0,
    'underdogs': 0,
    'final': 0
};

let currentTeamId = 'team-alpha'; // Default start
let refreshIntervalId = null;

// --- DOM ELEMENTS ---
const teamSelector = document.getElementById('view-selector');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const allTeamViews = document.querySelectorAll('.view-section');

// --- REFRESH LOGIC ---

function refreshActiveIframe(iframe) {
    if (!iframe) return;
    
    try {
        const url = new URL(iframe.src);
        url.searchParams.set('ts', new Date().getTime()); // Cache buster
        iframe.src = url.toString();
        console.log(`Refreshed iframe in: ${currentTeamId}`);
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

// --- CORE DISPLAY LOGIC ---

function updateDisplay() {
    // 1. Stop any existing timers immediately
    stopRefresh();

    // 2. Hide ALL team views first
    allTeamViews.forEach(view => view.style.display = 'none');

    // 3. Select the Current Team Wrapper
    const activeTeamContainer = document.getElementById(currentTeamId);
    if (!activeTeamContainer) return;

    // 4. Show the active team container
    activeTeamContainer.style.display = 'block';

    // 5. Get pages ONLY within this specific team
    const pages = activeTeamContainer.querySelectorAll('.page');
    const currentIndex = teamState[currentTeamId];

    // 6. Hide all pages in this team, then show the current one
    pages.forEach((page, index) => {
        if (index === currentIndex) {
            page.style.display = 'flex';
            
            // 7. Find the iframe inside this specific page and start timer
            const iframe = page.querySelector('iframe');
            if (iframe) {
                // Refresh immediately
                refreshActiveIframe(iframe);
                // Start interval
                refreshIntervalId = setInterval(() => {
                    refreshActiveIframe(iframe);
                }, REFRESH_INTERVAL);
            }
        } else {
            page.style.display = 'none';
        }
    });

    // 8. Update Button States based on this team's page count
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === pages.length - 1);
}

// --- EVENT HANDLERS ---

// Switch Teams
teamSelector.addEventListener('change', (e) => {
    currentTeamId = e.target.value;
    updateDisplay(); // This will load the saved page index for the new team
});

// Next Page
nextBtn.addEventListener('click', () => {
    const activeTeamContainer = document.getElementById(currentTeamId);
    const pages = activeTeamContainer.querySelectorAll('.page');
    
    // Check if we can move forward
    if (teamState[currentTeamId] < pages.length - 1) {
        teamState[currentTeamId]++; // Increment THIS team's index
        updateDisplay();
    }
});

// Previous Page
prevBtn.addEventListener('click', () => {
    // Check if we can move backward
    if (teamState[currentTeamId] > 0) {
        teamState[currentTeamId]--; // Decrement THIS team's index
        updateDisplay();
    }
});

// --- INITIALIZATION ---
// Ensure the state matches the dropdown on load
currentTeamId = teamSelector.value;
updateDisplay();