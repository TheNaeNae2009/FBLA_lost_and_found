//logs the user in after the form is subbmited
const form = document.querySelector("#sign-up-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await signUp(form);
});

function saveAuth(data) {
  localStorage.setItem("token", data.data.token);
  localStorage.setItem("user", JSON.stringify(data.data.user));

  console.log("Authenticated:", data.data.user);
}

function openProperPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role === "admin") {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "student-dashboard.html";
  }
}

async function signUp(form) {
  const email = form.email.value;
  const password = form.password.value;

  const headers = { "Content-Type": "application/json" };

  try {
    res = await fetch("https://mhslostandfound.com/api/v1/auth/sign-in", {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });

    data = await res.json();

    if (!res.ok) throw new Error(data.message || "Signin failed");

    console.log("SIGN IN SUCCESS", data);
    saveAuth(data);
    openProperPage();
    return;
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}
