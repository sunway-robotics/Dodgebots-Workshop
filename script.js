function welcome() {
    // Get the elements
    const tutorial1Button = document.getElementById("tut1");
    const tutorial2Button = document.getElementById("tut2");
    const welcomeButton = document.getElementById("wel");

    // Show the welcome screen and hide the tutorial screen
    tutorial1Button.style.fontWeight = "normal";
    welcomeButton.style.fontWeight = "bold";
    tutorial2Button.style.fontWeight = "normal";
}

function tutorial1() {
    // Get the elements
    const tutorial1Button = document.getElementById("tut1");
    const tutorial2Button = document.getElementById("tut2");
    const welcomeButton = document.getElementById("wel");

    // Show the tutorial screen and hide the welcome screen
    tutorial1Button.style.fontWeight = "bold";
    welcomeButton.style.fontWeight = "normal";
    tutorial2Button.style.fontWeight = "normal";
}

function tutorial2() {
    // Get the elements
    const tutorial1Button = document.getElementById("tut1");
    const tutorial2Button = document.getElementById("tut2");
    const welcomeButton = document.getElementById("wel");

    // Show the tutorial screen and hide the welcome screen
    tutorial1Button.style.fontWeight = "normal";
    welcomeButton.style.fontWeight = "normal";
    tutorial2Button.style.fontWeight = "bold";
}