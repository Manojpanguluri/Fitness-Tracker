const loggedInUser = localStorage.getItem("fitnessUser");

if (!loggedInUser) {
  window.location.href = "login.html";
} else {
  const firstName = loggedInUser.split("@")[0];
  const welcomeName = document.getElementById("welcomeName");
  const profileEmail = document.getElementById("profileEmail");

  if (welcomeName) {
    welcomeName.textContent = `Good morning, ${firstName}!`;
  }

  if (profileEmail) {
    profileEmail.textContent = `${loggedInUser} · Beginner fitness enthusiast`;
  }
}
