const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const progressBar = document.getElementById("progress");
const progressNumbers = document.getElementById("numbers");

// Add a container for the congratulatory message
const congratsMessage = document.createElement("p");
congratsMessage.id = "congrats-message";
congratsMessage.style.display = "none"; // Initially hidden
document.querySelector(".todo-app").appendChild(congratsMessage);

// Array of quotes from prominent people
const quotes = [
  "“The way to get started is to quit talking and begin doing.” – Walt Disney",
  "“Success is not final, failure is not fatal: It is the courage to continue that counts.” – Winston Churchill",
  "“Don’t watch the clock; do what it does. Keep going.” – Sam Levenson",
  "“The future depends on what you do today.” – Mahatma Gandhi",
  "“Believe you can and you're halfway there.” – Theodore Roosevelt",
  "“It always seems impossible until it’s done.” – Nelson Mandela",
  "“Your time is limited, so don’t waste it living someone else’s life.” – Steve Jobs",
  "“Hard work beats talent when talent doesn’t work hard.” – Tim Notke",
];

function AddTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Unicode for "×" symbol
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
  updateProgress();
}

const updateProgress = () => {
  const totalTasks = listContainer.children.length; // Total number of tasks
  const completedTasks = listContainer.querySelectorAll(".checked").length; // Tasks with "checked" class

  // Ensure progress bar updates correctly
  if (totalTasks > 0) {
    const progressPercentage = (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progressPercentage}%`; // Update progress bar width
  } else {
    progressBar.style.width = "0%"; // Reset progress bar if no tasks
  }

  // Update progress numbers
  progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

  // Show congratulatory message with a random quote if all tasks are completed
  if (totalTasks > 0 && completedTasks === totalTasks) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    congratsMessage.textContent = `🎉 Congratulations! ${randomQuote}`;
    congratsMessage.style.display = "block"; // Show the message
    congratsMessage.style.animation = "popup 0.5s ease-in-out"; // Add popup animation
  } else {
    congratsMessage.style.display = "none"; // Hide the message
  }
};

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked"); // Toggle "checked" class
      saveData();
      updateProgress();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove(); // Remove task
      saveData();
      updateProgress();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || ""; // Load saved tasks or set to empty
  updateProgress(); // Ensure progress bar updates on page load
}

showTask();
