const settingsToggle = document.getElementById("settings-button");
const settingsMenu = document.getElementById("settings-menu");

settingsToggle.addEventListener("click", () => {
  if (settingsMenu.style.display === "none") {
    settingsMenu.style.display = "flex"; // Show the menu
  } else {
    settingsMenu.style.display = "none"; // Hide the menu
  }
});

const navToggle = document.getElementById("mobile-toggle");
const nav = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  if (nav.style.display === "none") {
    nav.style.display = "flex"; // Show the menu
  } else {
    nav.style.display = "none"; // Hide the menu
  }
});
