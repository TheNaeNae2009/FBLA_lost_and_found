const browseItemsButton = document.querySelector("#browse-items-button");
const reportItemsButton = document.querySelector("#report-items-button");

const browseItemsContainer = document.querySelector("#browse-item-container");
const listingInfoContainer = document.querySelector("#listing-info-container");
const inquireContainer = document.querySelector("#inquire-container");
const claimItemContainer = document.querySelector("#claim-item-container");
const reportItemContainer = document.querySelector("#report-item-container");

browseItemsButton.addEventListener("click", () => {
  browseItemsContainer.style.display = "flex";
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

const reportItemForm = document.querySelector("#new-item-form");

reportItemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(reportItemForm);

  try {
    const res = await fetch("https://mhslostandfound.com/api/v1/items/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
