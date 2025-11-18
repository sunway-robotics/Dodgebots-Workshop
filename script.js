function welcome() {
    // Get the elements
    const welcomeScreen = document.getElementById("welcome");
    const tutorialScreen = document.getElementById("tutorial1");
    const tutorialButton = document.getElementById("tut1");
    const welcomeButton = document.getElementById("wel");

    // Show the welcome screen and hide the tutorial screen
    welcomeScreen.style.display = "block";
    tutorialScreen.style.display = "none";
    tutorialButton.style.fontWeight = "normal";
    welcomeButton.style.fontWeight = "bold";
}

function tutorial1() {
    // Get the elements
    const welcomeScreen = document.getElementById("welcome");
    const tutorialScreen = document.getElementById("tutorial1");
    const tutorialButton = document.getElementById("tut1");
    const welcomeButton = document.getElementById("wel");

    // Show the tutorial screen and hide the welcome screen
    tutorialScreen.style.display = "block";
    welcomeScreen.style.display = "none";
    tutorialButton.style.fontWeight = "bold";
    welcomeButton.style.fontWeight = "normal";
}