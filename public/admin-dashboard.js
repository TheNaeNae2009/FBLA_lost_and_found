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
