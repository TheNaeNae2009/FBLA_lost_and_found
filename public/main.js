const settingsToggle = document.getElementById("settings-button");
const settingsMenu = document.getElementById("settings-menu");
const navToggle = document.getElementById("mobile-toggle");
const nav = document.getElementById("nav-menu");

if (nav && settingsMenu) {
  settingsToggle.addEventListener("click", () => {
    if (settingsMenu.style.display !== "flex") {
      settingsMenu.style.display = "flex"; // Show the menu
    } else {
      settingsMenu.style.display = "none"; // Hide the menu
    }
  });

  navToggle.addEventListener("click", () => {
    if (nav.style.display !== "flex") {
      nav.style.display = "flex"; // Show the menu
    } else {
      nav.style.display = "none"; // Hide the menu
    }
  });
}
