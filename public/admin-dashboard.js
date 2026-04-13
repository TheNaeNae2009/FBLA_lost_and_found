const browseItemsButton = document.querySelector("#browse-items-button");
const pendingItemsButton = document.querySelector("#pending-items-button");

const browseItemsContainer = document.querySelector("#browse-item-container");
const adminListingInfoContainer = document.querySelector("#admin-listing-info-container");
const claimApprovalContainer = document.querySelector("#claim-approval-container");
const browsePendingItemsContainer = document.querySelector("#browse-pending-item-container");
const manageItemsContainer = document.querySelector("#manage-item-container");

const adminTitle = document.querySelector("#admin-title");

browseItemsButton.addEventListener("click", () => {
  adminTitle.textContent = "Browse Items";
  browseItemsContainer.style.display = "flex";
  adminListingInfoContainer.style.display = "none";
  claimApprovalContainer.style.display = "none";
  browsePendingItemsContainer.style.display = "none";
  manageItemsContainer.style.display = "none";
});

pendingItemsButton.addEventListener("click", () => {
  adminTitle.textContent = "Pending Items";
  browseItemsContainer.style.display = "none";
  adminListingInfoContainer.style.display = "none";
  claimApprovalContainer.style.display = "none";
  browsePendingItemsContainer.style.display = "flex";
  manageItemsContainer.style.display = "none";
});


function addListItems(data, listElement){
  data.forEach((data) => {
    const li = document.createElement("li");

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
      openAdminListingInfo(data);
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("https://mhslostandfound.com/api/v1/items/pending", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const response = await res.json();
    addListItems(response.data, document.getElementById("pending-list"));
    
  } catch (error) {
    console.log(error);
  }

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

const AdminListingInfo = document.querySelector("#admin-listing-info-container");

const posterName = document.querySelector("#poster-name");
const posterEmail = document.querySelector("#poster-email");
const itemDate = document.querySelector("#item-date");
const itemLocation = document.querySelector("#item-location");
const itemDescription = document.querySelector("#item-description");
const imagelist = document.querySelector("#image-list");
let listingData = null;

function openAdminListingInfo(data) {
  listingData = data;
  adminTitle.textContent = "Item Details";
  browseItemsContainer.style.display = "none";
  adminListingInfoContainer.style.display = "flex";
  claimApprovalContainer.style.display = "none";
  browsePendingItemsContainer.style.display = "none";
  manageItemsContainer.style.display = "none";

  posterName.textContent = `Posted by: ${data.user.name}`;
  posterEmail.textContent = `Email: ${data.user.email}`;
  itemDate.textContent = `Date: ${data.dateFound}`;
  itemLocation.textContent = `Found: ${data.location}`;
  itemDescription.textContent = `Description: ${data.description}`;

  data.images.forEach((image) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="https://mhslostandfound.com/uploads/${image}" />`;
    imagelist.appendChild(li);
  });

}

const approveButton = document.querySelector("#approve-button");
const rejectButton = document.querySelector("#reject-button");

approveButton.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`https://mhslostandfound.com/api/v1/items/approve/${listingData.name}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    const response = await res.json();
    console.log(response);
    location.reload();
  }catch (error) {
      const response = await error.json();
      console.log(response);
  }
});
rejectButton.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`https://mhslostandfound.com/api/v1/items/reject/${listingData.name}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    const response = await res.json();
    console.log(response);
    location.reload();
  }catch (error) {
      const response = await error.json();
      console.log(response);
  }
});

const adminListingBackButton = document.querySelector("#admin-listing-back");

adminListingBackButton.addEventListener("click", () => {
  adminTitle.textContent = "Pending Items";
  browseItemsContainer.style.display = "none";
  adminListingInfoContainer.style.display = "none";
  claimApprovalContainer.style.display = "none";
  browsePendingItemsContainer.style.display = "flex";
  manageItemsContainer.style.display = "none";
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

// searchable list display update
const pendingSearchableList = document.getElementById("pending-searchable-list");
const pendingSearchInput = document.getElementById("pending-search-input");
const pendingLists = document.querySelectorAll("#pending-list li");
const PendingxIcon = document.getElementById("pending-x-icon");
const PendingsearchIcon = document.getElementById("pending-search-icon");

const pendingUpdateDisplay = () => {
  const searchTerm = pendingSearchInput.value.trim().toLowerCase();
  PendingxIcon.style.display = searchTerm ? "block" : "none";
  PendingsearchIcon.style.display = searchTerm ? "none" : "block";

  pendingLists.forEach((item) => {
    const textContainer = item.querySelector(".listing-text-container");
    const title = textContainer.querySelector(".listing-title");
    const titleText = title.textContent.trim().toLowerCase();
    item.style.display = titleText.includes(searchTerm) ? "flex" : "none";
  });
};

if (pendingSearchableList) {
  pendingSearchInput.addEventListener("input", pendingUpdateDisplay);
  PendingxIcon.addEventListener("click", () => {
    pendingSearchInput.value = "";
    pendingUpdateDisplay();
  });
}