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

    const img = data.images?.[0] || "/assets/default.jpg";

    li.innerHTML = `
    <img src="${img.startsWith("http") ? img : "/" + img}" />
    <div class="listing-text-container">
      <p class="listing-title">${data.name}</p>
      <p>${data.dateFound}</p>
      <p>${data.location}</p>
    </div>
  `;
    pendingList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("https://mhslostandfound.com/api/v1/items/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const response = await res.json();
    addListItems(response.data);
  } catch (error) {
    console.log(error);
  }
});
