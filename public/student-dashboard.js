const browseItemsButton = document.querySelector("#browse-items-button");
const reportItemsButton = document.querySelector("#report-items-button");

const browseItemsContainer = document.querySelector("#browse-item-container");
const listingInfoContainer = document.querySelector("#listing-info-container");
const claimItemContainer = document.querySelector("#claim-item-container");
const reportItemContainer = document.querySelector("#report-item-container");

browseItemsButton.addEventListener("click", () => {
  browseItemsContainer.style.display = "flex";
  listingInfoContainer.style.display = "none";
  claimItemContainer.style.display = "none";
  reportItemContainer.style.display = "none";
});

reportItemsButton.addEventListener("click", () => {
  browseItemsContainer.style.display = "none";
  listingInfoContainer.style.display = "none";
  claimItemContainer.style.display = "none";
  reportItemContainer.style.display = "flex";
});

const reportItemForm = document.querySelector("#new-item-form");

reportItemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(reportItemForm);

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("https://mhslostandfound.com/api/v1/items/", {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

function addListItems(data, listElement){
  data.forEach((data) => {
    const li = document.createElement("li");
    li.setAttribute("tabindex", "0");
    li.setAttribute("aria-label", data.name);

    const img = data.images?.[0] || "/";

    li.innerHTML = `
    <img src="https://mhslostandfound.com/uploads/${img}" />
    <div class="listing-text-container">
      <p class="listing-title">${data.name}</p>
      <p>${data.dateFound}</p>
      <p>${data.location}</p>
    </div>
  `;
    listElement.appendChild(li);
    if (listElement.id === "pending-list") {
      li.addEventListener("click", () => {
        openStudentListingInfo(data);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("https://mhslostandfound.com/api/v1/items/approved", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const response = await res.json();
    addListItems(response.data, document.getElementById("list"));
    
  } catch (error) {
    console.log(error);
  }
});


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

const listingTitle = document.querySelector("#listing-title");
const imageList = document.querySelector("#image-list");
const itemDate = document.querySelector("#item-date");
const itemLocation = document.querySelector("#item-location");
const itemDescription = document.querySelector("#item-description");

const claimItemButton = document.querySelector("#claim-item-button");
const backButton = document.querySelector("#back-button");


function openStudentListingInfo(data) {
  listingData = data;
  listingTitle.textContent = "Item Details";

  browseItemsContainer.style.display = "none";
  listingInfoContainer.style.display = "flex";
  claimItemContainer.style.display = "none";
  reportItemContainer.style.display = "none";

  itemDate.textContent = `Date: ${data.dateFound}`;
  itemLocation.textContent = `Found: ${data.location}`;
  itemDescription.textContent = `Description: ${data.description}`;

  imagelist.innerHTML = "";
  data.images.forEach((image) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="https://mhslostandfound.com/uploads/${image}" />`;
    imagelist.appendChild(li);
  });

}