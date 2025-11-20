function welcome() {
    // Get the navigation links
    const tutorial1Button = document.getElementById("tut1");
    const tutorial2Button = document.getElementById("tut2");
    const welcomeButton = document.getElementById("wel");

    // Get the content sections
    const welcomeContent = document.getElementById("welcome");
    const tutorial1Content = document.getElementById("tutorial1");
    const tutorial2Content = document.getElementById("tutorial2");

    // 1. Update navigation link style (already done)
    tutorial1Button.style.fontWeight = "normal";
    welcomeButton.style.fontWeight = "bold";
    tutorial2Button.style.fontWeight = "normal";

    // 2. ⭐ CORRECTIVE ACTION: Show/Hide Content
    welcomeContent.style.display = "block"; // SHOW Welcome
    tutorial1Content.style.display = "none";  // HIDE Tutorial 1
    tutorial2Content.style.display = "none";  // HIDE Tutorial 2
}

function tutorial1() {
    // Get the navigation links
    const tutorial1Button = document.getElementById("tut1");
    const tutorial2Button = document.getElementById("tut2");
    const welcomeButton = document.getElementById("wel");

    // Get the content sections
    const welcomeContent = document.getElementById("welcome");
    const tutorial1Content = document.getElementById("tutorial1");
    const tutorial2Content = document.getElementById("tutorial2");

    // 1. Update navigation link style (already done)
    tutorial1Button.style.fontWeight = "bold";
    welcomeButton.style.fontWeight = "normal";
    tutorial2Button.style.fontWeight = "normal";

    // 2. ⭐ CORRECTIVE ACTION: Show/Hide Content
    welcomeContent.style.display = "none";    // HIDE Welcome
    tutorial1Content.style.display = "block";   // SHOW Tutorial 1
    tutorial2Content.style.display = "none";    // HIDE Tutorial 2
}

function tutorial2() {
    // Get the navigation links
    const tutorial1Button = document.getElementById("tut1");
    const tutorial2Button = document.getElementById("tut2");
    const welcomeButton = document.getElementById("wel");

    // Get the content sections
    const welcomeContent = document.getElementById("welcome");
    const tutorial1Content = document.getElementById("tutorial1");
    const tutorial2Content = document.getElementById("tutorial2");

    // 1. Update navigation link style (already done)
    tutorial1Button.style.fontWeight = "normal";
    welcomeButton.style.fontWeight = "normal";
    tutorial2Button.style.fontWeight = "bold";

    // 2. ⭐ CORRECTIVE ACTION: Show/Hide Content
    welcomeContent.style.display = "none";    // HIDE Welcome
    tutorial1Content.style.display = "none";    // HIDE Tutorial 1
    tutorial2Content.style.display = "block";   // SHOW Tutorial 2
}

function myFunction() {
  var x = document.getElementById("left_side");
  var y = document.getElementById("main")
  
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "inline-flex"; // SHOW the sidebar
    y.style.gridTemplateColumns = "1fr 4fr";

  } else {
    x.style.display = "none"; // HIDE the sidebar
    y.style.gridTemplateColumns = "1fr";
  }
}