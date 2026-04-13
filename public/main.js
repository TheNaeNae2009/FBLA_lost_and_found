// settings and mobile nav toggles

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

// searchable list display update
const searchableList = document.getElementById("searchable-list");
const searchInput = document.getElementById("search-input");
const lists = document.querySelectorAll("#list li");
const xIcon = document.getElementById("x-icon");
const searchIcon = document.getElementById("search-icon");

const updateDisplay = () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  xIcon.style.display = searchTerm ? "block" : "none";
  searchIcon.style.display = searchTerm ? "none" : "block";

  lists.forEach((item) => {
    const textContainer = item.querySelector(".listing-text-container");
    const title = textContainer.querySelector(".listing-title");
    const titleText = title.textContent.trim().toLowerCase();
    item.style.display = titleText.includes(searchTerm) ? "flex" : "none";
  });
};

if (searchableList) {
  searchInput.addEventListener("input", updateDisplay);
  xIcon.addEventListener("click", () => {
    searchInput.value = "";
    updateDisplay();
  });
}


