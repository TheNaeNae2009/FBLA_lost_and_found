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