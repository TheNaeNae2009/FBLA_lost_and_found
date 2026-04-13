const browseItemsButton = document.querySelector("#browse-items-button");
const reportItemsButton = document.querySelector("#report-items-button");

const browseItemsContainer = document.querySelector("#browse-item-container");
const listingInfoContainer = document.querySelector("#listing-info-container");
const claimItemContainer = document.querySelector("#claim-item-container");
const reportItemContainer = document.querySelector("#report-item-container");

const dashboardTitle = document.querySelector("#student-dashboard-title");

browseItemsButton.addEventListener("click", () => {
  dashboardTitle.textContent = "Browse Items";
  browseItemsContainer.style.display = "flex";
  listingInfoContainer.style.display = "none";
  claimItemContainer.style.display = "none";
  reportItemContainer.style.display = "none";
});

reportItemsButton.addEventListener("click", () => {
  dashboardTitle.textContent = "Report Item";
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
    window.location.reload();
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

    li.addEventListener("click", () => {
      openStudentListingInfo(data);
    });
    
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

const listingTitle = document.querySelector("#listing-title");
const imageList = document.querySelector("#image-list");
const itemDate = document.querySelector("#item-date");
const itemLocation = document.querySelector("#item-location");
const itemDescription = document.querySelector("#item-description");

const claimItemButton = document.querySelector("#claim-item-button");
const backButton = document.querySelector("#back-button");

let listingData = null;

function openStudentListingInfo(data) {
  listingData = data;
  listingTitle.textContent = data.name;

  dashboardTitle.textContent = "Item Details";
  browseItemsContainer.style.display = "none";
  listingInfoContainer.style.display = "flex";
  claimItemContainer.style.display = "none";
  reportItemContainer.style.display = "none";

  itemDate.textContent = `Date: ${data.dateFound}`;
  itemLocation.textContent = `Found: ${data.location}`;
  itemDescription.textContent = `Description: ${data.description}`;

  imageList.innerHTML = "";
  data.images.forEach((image) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="https://mhslostandfound.com/uploads/${image}" />`;
    imageList.appendChild(li);
  });

}

backButton.addEventListener("click", () => {
  dashboardTitle.textContent = "Browse Items";
  browseItemsContainer.style.display = "flex";
  listingInfoContainer.style.display = "none";
  claimItemContainer.style.display = "none";
  reportItemContainer.style.display = "none";
});

claimItemButton.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`https://mhslostandfound.com/api/v1/items/claim/${listingData.name}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log(data);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});
