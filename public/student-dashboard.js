const browseItemsButton = document.querySelector("#browse-items-button");
const reportItemsButton = document.querySelector("#report-items-button");

const browseItemsContainer = document.querySelector("#browse-item-container");
const listingInfoContainer = document.querySelector("#listing-info-container");
const inquireContainer = document.querySelector("#inquire-container");
const claimItemContainer = document.querySelector("#claim-item-container");
const reportItemContainer = document.querySelector("#report-item-container");

browseItemsButton.addEventListener("click", () => {
  browseItemsContainer.style.display = "flex";
  browseItemsContainer.style.width = "100%";
  listingInfoContainer.style.display = "none";
  inquireContainer.style.display = "none";
  claimItemContainer.style.display = "none";
  reportItemContainer.style.display = "none";
});

reportItemsButton.addEventListener("click", () => {
  browseItemsContainer.style.display = "none";
  listingInfoContainer.style.display = "none";
  inquireContainer.style.display = "none";
  claimItemContainer.style.display = "none";
  reportItemContainer.style.display = "flex";
});
