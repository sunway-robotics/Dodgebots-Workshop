const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentPageIndex = 0; // Start at the first page (index 0)
let refreshIntervalId = null; // Variable to hold the active interval ID

// Array of all potential iframe IDs
const iframeIds = ['sheet-iframe1', 'sheet-iframe2', 'sheet-iframe3', 'sheet-iframe4'];
const REFRESH_INTERVAL = 10000; // Recommended to increase to 60 seconds (60000ms)

// Function to refresh a specific iframe element
function refreshIframe(iframeId) {
    const iframe = document.getElementById(iframeId);
    if (iframe) {
        const url = new URL(iframe.src);
        // Add a unique timestamp to prevent browser/server caching
        url.searchParams.set('ts', new Date().getTime());
        iframe.src = url.toString();
        console.log(`Iframe refreshed: ${iframeId}`);
    }
}

// Function to stop the existing refresh interval
function stopRefresh() {
    if (refreshIntervalId !== null) {
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
        console.log('Refresh interval stopped.');
    }
}

function updatePageDisplay() {
    // 1. Stop any currently running refresh interval immediately
    stopRefresh();

    // 2. Hide all pages
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Get the current page element
    const currentPage = pages[currentPageIndex];
    
    // 3. Show the current page
    currentPage.style.display = 'flex';

    // 4. Determine the iframe on the current page and START its refresh cycle
    
    // Find which iframe, if any, is on the current page
    let activeIframeId = null;
    for (const id of iframeIds) {
        if (currentPage.querySelector(`#${id}`)) {
            activeIframeId = id;
            break; // Found the active one, no need to check others
        }
    }

    if (activeIframeId) {
        // Start the interval for the active iframe
        refreshIntervalId = setInterval(() => {
            refreshIframe(activeIframeId);
        }, REFRESH_INTERVAL);

        // Run the refresh once immediately upon navigation
        refreshIframe(activeIframeId);
        console.log(`Refresh interval started for: ${activeIframeId}`);
    } 

    // 5. Update button states (disabled/enabled)
    prevBtn.disabled = (currentPageIndex === 0);
    nextBtn.disabled = (currentPageIndex === pages.length - 1);
}

// Handler for the "Next Page" button
nextBtn.addEventListener('click', () => {
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++; // Move to the next index
        updatePageDisplay();
    }
});

// Handler for the "Previous Page" button
prevBtn.addEventListener('click', () => {
    if (currentPageIndex > 0) {
        currentPageIndex--; // Move to the previous index
        updatePageDisplay();
    }
});

// Initial call to set up the display and start the first interval if a sheet is on page 1
updatePageDisplay();