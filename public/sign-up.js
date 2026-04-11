//logs the user in after the form is subbmited
const form = document.querySelector("#sign-up-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await logIn(form);
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

async function logIn(form) {
  const name = form.username?.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirm_password = form.confirm.value;

  if (password != confirm_password) {
    throw new Error("Password does not match");
  }

  const headers = { "Content-Type": "application/json" };

  try {
    res = await fetch("http://localhost:5500/api/v1/auth/sign-up", {
      method: "POST",
      headers,
      body: JSON.stringify({ name, email, password }),
    });

    data = await res.json();

    if (!res.ok) throw new Error(data.message || "Signup failed");

    console.log("SIGN UP SUCCESS", data);
    saveAuth(data);
    openProperPage();
    return;
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}
