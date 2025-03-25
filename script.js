let smallCups = document.querySelectorAll(".cup-small");
let remained = document.getElementById("remained");
let liters = document.getElementById("liters");
let percentage = document.getElementById("percentage");
let totalWater = 2000; // Total goal in ml



updateBigCup();
smallCups.forEach((cup, idx) => {
  cup.addEventListener("click", () => highlightCups(idx));
});

function highlightCups(idx) {
  const smallCups = document.querySelectorAll(".cup-small");

  // Prevent filling cup out of order
  if (idx > 0 && !smallCups[idx - 1].classList.contains("full")) {
    return; // Exit if the previous cup isn't filled
  }

  // Toggle the last selected cup if clicked again
  if (smallCups[idx].classList.contains("full") && 
      (idx === smallCups.length - 1 || !smallCups[idx + 1].classList.contains("full"))) {
    idx--;
  }

  smallCups.forEach((cup, i) => {
    if (i <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateBigCup();
}


function updateBigCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;
  const totalWater = 2000; // 2 liters in milliliters

  // Correct percentage calculation
  const filledPercentage = (fullCups * 250) / totalWater * 100;

  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups * 250) / 2000 * 100}%`;
    percentage.innerText = `${Math.round(filledPercentage)}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${(totalWater - fullCups * 250) / 1000}L`;
  }
}

document.getElementById("reset").addEventListener("click", () => {
  document.querySelectorAll(".cup-small").forEach(cup => cup.classList.remove("full"));
  updateBigCup();
});

function highlightCups(idx) {
  const smallCups = document.querySelectorAll(".cup-small");

  if (idx > 0 && !smallCups[idx - 1].classList.contains("full")) return;

  if (smallCups[idx].classList.contains("full") && 
      (idx === smallCups.length - 1 || !smallCups[idx + 1].classList.contains("full"))) {
    idx--;
  }

  smallCups.forEach((cup, i) => {
    if (i <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateBigCup();
  saveProgress(); // Save selection
}

function saveProgress() {
  const filledCups = [...document.querySelectorAll(".cup-small")].map(cup => cup.classList.contains("full"));
  localStorage.setItem("hydrationTracker", JSON.stringify(filledCups));
}

// Load Progress on Page Load
function loadProgress() {
  const saved = JSON.parse(localStorage.getItem("hydrationTracker"));
  if (!saved) return;

  const smallCups = document.querySelectorAll(".cup-small");
  smallCups.forEach((cup, i) => {
    if (saved[i]) cup.classList.add("full");
  });

  updateBigCup();
}

// Call loadProgress when the page loads
window.addEventListener("load", loadProgress);

const waterSound = new Audio("water.mp3");

function highlightCups(idx) {
  const smallCups = document.querySelectorAll(".cup-small");

  if (idx > 0 && !smallCups[idx - 1].classList.contains("full")) return;

  if (smallCups[idx].classList.contains("full") && 
      (idx === smallCups.length - 1 || !smallCups[idx + 1].classList.contains("full"))) {
    idx--;
  }

  smallCups.forEach((cup, i) => {
    if (i <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateBigCup();
  saveProgress();
  waterSound.play(); // Play sound
}
