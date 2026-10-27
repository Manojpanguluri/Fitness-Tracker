const goalForm = document.getElementById("goalForm");
const goalMessage = document.getElementById("goalMessage");
const goalValue = document.getElementById("goalValue");
const goalStatus = document.getElementById("goalStatus");
const goalList = document.getElementById("goalList");
const currentUser = localStorage.getItem("fitnessUser");
const savedGoals = JSON.parse(localStorage.getItem("fitnessGoals") || "{}");
const userGoals = savedGoals[currentUser] || [];

function showGoals() {
  goalList.innerHTML = "";

  userGoals.forEach(function (goal) {
    const savedGoal = document.createElement("p");
    savedGoal.textContent = `${goal.target} min ${goal.activity}`;
    savedGoal.className = "saved-goal";
    goalList.appendChild(savedGoal);
  });

  const goalCount = userGoals.length;
  goalValue.textContent = goalCount === 0 ? "No goals yet" : `${goalCount} goal${goalCount === 1 ? "" : "s"} saved`;
  goalStatus.textContent = goalCount === 0 ? "Add goals below to begin." : "Goals added for today:";
  goalStatus.className = goalCount === 0 ? "small text-secondary mt-3 mb-2" : "small text-success mt-3 mb-2";
}

showGoals();

goalForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const activity = document.getElementById("activity").value;
  const target = document.getElementById("target").value;

  userGoals.push({ activity: activity, target: target });
  savedGoals[currentUser] = userGoals;
  localStorage.setItem("fitnessGoals", JSON.stringify(savedGoals));
  showGoals();

  goalMessage.textContent = `Great! Your ${target}-minute ${activity.toLowerCase()} goal is saved.`;
  goalMessage.className = "small mt-3 mb-0 text-success fw-semibold";
});
