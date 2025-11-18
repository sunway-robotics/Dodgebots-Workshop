function welcome() {
    // Get the elements
    const welcomeScreen = document.getElementById("welcome");
    const tutorial1Screen = document.getElementById("tutorial1");
    const tutorial1Button = document.getElementById("tut1");
    const tutorial2Screen = document.getElementById("tutorial2");
    const tutorial2Button = document.getElementById("tut2");
    const welcomeButton = document.getElementById("wel");

    // Show the welcome screen and hide the tutorial screen
    tutorial2Screen.style.display = "none";
    tutorial1Screen.style.display = "none";
    welcomeScreen.style.display = "block";
    tutorial1Button.style.fontWeight = "normal";
    welcomeButton.style.fontWeight = "bold";
    tutorial2Button.style.fontWeight = "normal";
}

function tutorial1() {
    // Get the elements
    const welcomeScreen = document.getElementById("welcome");
    const tutorial1Screen = document.getElementById("tutorial1");
    const tutorial1Button = document.getElementById("tut1");
    const tutorial2Screen = document.getElementById("tutorial2");
    const tutorial2Button = document.getElementById("tut2");
    const welcomeButton = document.getElementById("wel");

    // Show the tutorial screen and hide the welcome screen
    tutorial2Screen.style.display = "none";
    tutorial1Screen.style.display = "block";
    welcomeScreen.style.display = "none";
    tutorial1Button.style.fontWeight = "bold";
    welcomeButton.style.fontWeight = "normal";
    tutorial2Button.style.fontWeight = "normal";
}

function tutorial2() {
    // Get the elements
    const welcomeScreen = document.getElementById("welcome");
    const tutorial1Screen = document.getElementById("tutorial1");
    const tutorial1Button = document.getElementById("tut1");
    const tutorial2Screen = document.getElementById("tutorial2");
    const tutorial2Button = document.getElementById("tut2");
    const welcomeButton = document.getElementById("wel");

    // Show the tutorial screen and hide the welcome screen
    tutorial2Screen.style.display = "block";
    tutorial1Screen.style.display = "none";
    welcomeScreen.style.display = "none";
    tutorial1Button.style.fontWeight = "normal";
    welcomeButton.style.fontWeight = "normal";
    tutorial2Button.style.fontWeight = "bold";
}