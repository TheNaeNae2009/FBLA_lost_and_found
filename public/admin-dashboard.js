const browseItemsButton = document.querySelector("#browse-items-button");
const pendingItemsButton = document.querySelector("#pending-items-button");

const browseItemsContainer = document.querySelector("#browse-item-container");
const adminListingInfoContainer = document.querySelector("#admin-listing-info-container");
const claimApprovalContainer = document.querySelector("#claim-approval-container");
const inquiryResponseContainer = document.querySelector("#inquiry-response-container");
const browsePendingItemsContainer = document.querySelector("#browse-pending-item-container");
const manageItemsContainer = document.querySelector("#manage-item-container");

browseItemsButton.addEventListener("click", () => {
  browseItemsContainer.style.display = "flex";
  adminListingInfoContainer.style.display = "none";
  claimApprovalContainer.style.display = "none";
  inquiryResponseContainer.style.display = "none";
  browsePendingItemsContainer.style.display = "none";
  manageItemsContainer.style.display = "none";
});

pendingItemsButton.addEventListener("click", () => {
  browseItemsContainer.style.display = "none";
  adminListingInfoContainer.style.display = "none";
  claimApprovalContainer.style.display = "none";
  inquiryResponseContainer.style.display = "none";
  browsePendingItemsContainer.style.display = "flex";
  manageItemsContainer.style.display = "none";
});


function addListItems(data) {
  const pendingList = document.querySelector("#pending-list");

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
    pendingList.appendChild(li);
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
    addListItems(response.data);
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

function openAdminListingInfo(data) {
  browseItemsContainer.style.display = "none";
  adminListingInfoContainer.style.display = "flex";
  claimApprovalContainer.style.display = "none";
  inquiryResponseContainer.style.display = "none";
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