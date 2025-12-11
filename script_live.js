// Function to refresh the iframe by adding a unique timestamp to the source URL
  function refreshIframe1() {
    const iframe = document.getElementById('sheet-iframe1');
    const url = new URL(iframe.src);
    // Add a unique timestamp to prevent browser/server caching
    url.searchParams.set('ts', new Date().getTime());
    iframe.src = url.toString();
  }

  setInterval(refreshIframe1, 5000);

  function refreshIframe2() {
    const iframe = document.getElementById('sheet-iframe2');
    const url = new URL(iframe.src);
    // Add a unique timestamp to prevent browser/server caching
    url.searchParams.set('ts', new Date().getTime());
    iframe.src = url.toString();
  }

  setInterval(refreshIframe2, 5000);

function refreshIframe3() {
    const iframe = document.getElementById('sheet-iframe3');
    const url = new URL(iframe.src);
    // Add a unique timestamp to prevent browser/server caching
    url.searchParams.set('ts', new Date().getTime());
    iframe.src = url.toString();
  }

  setInterval(refreshIframe3, 5000);

  function refreshIframe4() {
    const iframe = document.getElementById('sheet-iframe4');
    const url = new URL(iframe.src);
    // Add a unique timestamp to prevent browser/server caching
    url.searchParams.set('ts', new Date().getTime());
    iframe.src = url.toString();
  }

  setInterval(refreshIframe4, 5000);

const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentPageIndex = 0; // Start at the first page (index 0)

function updatePageDisplay() {
    // 1. Hide all pages
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // 2. Show the current page
    pages[currentPageIndex].style.display = 'flex';

    // 3. Update button states (disabled/enabled)
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

// Initial call to set up the display
updatePageDisplay();