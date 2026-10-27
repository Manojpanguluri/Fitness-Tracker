const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");

emailInput.value = localStorage.getItem("fitnessLastEmail") || "";

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  localStorage.setItem("fitnessUser", emailInput.value);
  localStorage.setItem("fitnessLastEmail", emailInput.value);
  window.location.href = "index.html";
});
