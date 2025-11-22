// --- USER REGISTRATION (using backend API) ---
function register(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const schoolName = document.getElementById("schoolName").value.trim();
  const classGrade = document.getElementById("classGrade").value.trim();
  const age = parseInt(document.getElementById("age").value.trim());
  const gender = document.getElementById("gender").value;

  const msg = document.getElementById("registerMsg");

  if (password !== confirmPassword) {
    msg.innerText = "❌ Passwords do not match!";
    return;
  }

  const userData = {
    fullName, email, username, password, schoolName, classGrade, age, gender
  };

  fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  })
  .then(async res => {
    const result = await res.json();
    if (res.ok) {
      alert("✅ Registered successfully!");
      window.location.href = "login.html";
    } else {
      msg.innerText = "❌ " + result.error;
    }
  })
  .catch(error => {
    msg.innerText = "❌ Failed to register (backend offline?)";
    console.error("Registration error:", error);
  });
}
// --- USER LOGIN (via backend) ---
function login(event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const msg = document.getElementById("loginMsg"); // Add a <p id="loginMsg"> in login.html if needed

  fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(async res => {
    const result = await res.json();
    if (res.ok) {
      alert("✅ Login successful!");
      localStorage.setItem("sdgUser", JSON.stringify(result.user));  // optional
      localStorage.setItem("sdgSession", "true");
      localStorage.setItem("token", result.token || ""); // if backend sends a JWT
      window.location.href = "Dashboard.html";
    } else {
      msg.innerText = "❌ " + result.error;
    }
  })
  .catch(err => {
    msg.innerText = "❌ Login failed: backend not reachable";
    console.error("Login error:", err);
  });
}


// --- DASHBOARD ACCESS GUARD + BUTTONS ---
if (window.location.pathname.includes("dashboard.html")) {
  if (localStorage.getItem("sdgSession") !== "true") {
    alert("Registration successful! Redirecting to login...");
    window.location.href = "login.html"; // ✅ Go to login page instead
  }

  const header = document.querySelector("header");

  const profileBtn = document.createElement("button");
  profileBtn.innerText = "Profile";
  profileBtn.className = "profile-btn";
  profileBtn.onclick = () => window.location.href = "profile.html";
  header.appendChild(profileBtn);

  const logoutBtn = document.createElement("button");
  logoutBtn.innerText = "Logout";
  logoutBtn.className = "logout-btn";
  logoutBtn.onclick = () => {
    localStorage.removeItem("sdgSession");
    window.location.href = "index.html";
  };
  header.appendChild(logoutBtn);
}

// --- Show Goals When Button Clicked ---
const viewGoalsBtn = document.getElementById("viewGoalsBtn");
if (viewGoalsBtn) {
  viewGoalsBtn.addEventListener("click", () => {
    document.getElementById("goalsSection").style.display = "block";
    viewGoalsBtn.style.display = "none"; // hide the button after click
  });
}

// --- GOAL DATA ---
const goals = [
  "No Poverty", "Zero Hunger", "Good Health and Well-being", "Quality Education",
  "Gender Equality", "Clean Water and Sanitation", "Affordable and Clean Energy",
  "Decent Work and Economic Growth", "Industry, Innovation and Infrastructure",
  "Reduced Inequality", "Sustainable Cities and Communities",
  "Responsible Consumption and Production", "Climate Action", "Life Below Water",
  "Life on Land", "Peace, Justice and Strong Institutions", "Partnerships for the Goals"
];

const goalDetails = {
  1: {
    title: "No Poverty",
    definition: "End poverty in all its forms everywhere.",
    facts: "Over 700 million people still live on less than $1.90 a day.",
    actions: "Support social programs, donate to causes, raise awareness."
  },
  2: {
    title: "Zero Hunger",
    definition: "End hunger, achieve food security and improved nutrition.",
    facts: "1 in 9 people go to bed hungry each night.",
    actions: "Avoid food waste, support food banks, buy local."
  },
  3: {
    title: "Good Health and Well-being",
    definition: "Ensure healthy lives and promote well-being for all.",
    facts: "Child mortality has been halved since 1990.",
    actions: "Get vaccinated, exercise, promote health education."
  },
  4: {
    title: "Quality Education",
    definition: "Ensure inclusive and equitable quality education.",
    facts: "262 million children were out of school in 2017.",
    actions: "Volunteer to tutor, donate books, support education NGOs."
  },
  5: {
    title: "Gender Equality",
    definition: "Achieve gender equality and empower all women and girls.",
    facts: "1 in 3 women experience violence in their lifetime.",
    actions: "Advocate for equal rights, support women-led businesses."
  },
  6: {
    title: "Clean Water and Sanitation",
    definition: "Ensure availability and sustainable management of water.",
    facts: "2.2 billion people lack safely managed drinking water.",
    actions: "Conserve water, support clean water initiatives."
  },
  7: {
    title: "Affordable and Clean Energy",
    definition: "Ensure access to affordable, reliable, and sustainable energy.",
    facts: "789 million people live without electricity.",
    actions: "Use energy-efficient appliances, support renewable energy."
  },
  8: {
    title: "Decent Work and Economic Growth",
    definition: "Promote sustained, inclusive economic growth and decent work.",
    facts: "Youth unemployment rate is more than double the adult rate.",
    actions: "Support fair trade, upskill, encourage innovation."
  },
  9: {
    title: "Industry, Innovation and Infrastructure",
    definition: "Build resilient infrastructure and promote sustainable industrialization.",
    facts: "Reliable infrastructure creates job and prosperity.",
    actions: "Support local businesses, invest in innovation."
  },
  10: {
    title: "Reduced Inequality",
    definition: "Reduce inequality within and among countries.",
    facts: "The richest 10% earn up to 40% of global income.",
    actions: "Fight discrimination, support inclusive policies."
  },
  11: {
    title: "Sustainable Cities and Communities",
    definition: "Make cities inclusive, safe, resilient, and sustainable.",
    facts: "Half of humanity lives in urban areas.",
    actions: "Use public transport, reduce pollution, recycle."
  },
  12: {
    title: "Responsible Consumption and Production",
    definition: "Ensure sustainable consumption and production patterns.",
    facts: "1.3 billion tons of food is wasted every year.",
    actions: "Buy only what you need, avoid plastic, reuse items."
  },
  13: {
    title: "Climate Action",
    definition: "Take urgent action to combat climate change.",
    facts: "Global warming is causing extreme weather worldwide.",
    actions: "Reduce carbon footprint, plant trees, support green policies."
  },
  14: {
    title: "Life Below Water",
    definition: "Conserve oceans, seas and marine resources.",
    facts: "Over 30% of marine habitats are destroyed.",
    actions: "Avoid plastic, eat sustainable seafood, protect beaches."
  },
  15: {
    title: "Life on Land",
    definition: "Protect, restore and promote sustainable use of ecosystems.",
    facts: "13 million hectares of forest are lost every year.",
    actions: "Conserve land, protect wildlife, support reforestation."
  },
  16: {
    title: "Peace, Justice and Strong Institutions",
    definition: "Promote peaceful and inclusive societies.",
    facts: "Corruption and weak institutions are a major problem.",
    actions: "Speak up for justice, support transparent governance."
  },
  17: {
    title: "Partnerships for the Goals",
    definition: "Revitalize global partnerships for sustainable development.",
    facts: "Stronger cooperation leads to real change.",
    actions: "Support global aid, promote fair trade and education."
  }
};

// --- RENDER DASHBOARD GOALS ---
if (document.getElementById("dashboard")) {
  const dashboard = document.getElementById("dashboard");
  const goalContent = document.getElementById("goalContent");
  const completedGoals = JSON.parse(localStorage.getItem("completedGoals") || "[]");

  for (let i = 1; i <= 17; i++) {
    const container = document.createElement("div");
    container.className = "goal-image-container";
    if (completedGoals.includes(String(i))) {
      container.classList.add("completed-goal");
    }

    const img = document.createElement("img");
    img.src = `SDG-${i}.png`;
    img.alt = `Goal ${i}`;
    img.title = goalDetails[i].title;
    img.onclick = () => window.location.href = `sdg${i}.html`;


    container.appendChild(img);
    dashboard.appendChild(container);
  }

  if (completedGoals.length === 17) {
    const finalQuiz = document.createElement("div");
    finalQuiz.className = "goal-image-container";
    finalQuiz.style.borderLeft = "8px solid gold";
    finalQuiz.innerHTML = `<h3>🌍 Final Quiz</h3><p>Test your knowledge across all SDGs!</p>`;
    finalQuiz.onclick = () => window.location.href = "quiz.html?goal=final&title=Final+Quiz";
    dashboard.appendChild(finalQuiz);
  }

  window.goBack = function () {
    goalContent.innerHTML = "";
    dashboard.style.display = "grid";
  };
}

// --- SHOW INDIVIDUAL GOAL PAGE ---
function showGoal(num) {
  const goal = goalDetails[num];
  const dashboard = document.getElementById("dashboard");
  const goalContent = document.getElementById("goalContent");

  dashboard.style.display = "none";
  goalContent.innerHTML = `
    <div class="goal-page">
      <h2>Goal ${num}: ${goal.title}</h2>
      <p><strong>Definition:</strong> ${goal.definition}</p>
      <p><strong>Key Facts:</strong> ${goal.facts}</p>
      <p><strong>What You Can Do:</strong> ${goal.actions}</p>
      <video controls>
        <source src="videos/goal${num}.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <a href="quiz.html?goal=${num}&title=${encodeURIComponent(goal.title)}" class="quiz-btn">🧠 Take Quiz</a>
      <button class="back-btn" onclick="goBack()">⬅ Back</button>
    </div>
  `;
}


// --- SERVICE WORKER ---
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}

const token = localStorage.getItem("token"); // Save JWT after login

fetch("http://localhost:5000/api/quiz/1", {
  method: "GET",
  headers: {
    "Authorization": token // JWT needed if route is protected
  }
})
.then(res => res.json())
.then(data => {
  console.log("Quiz loaded:", data);
  // TODO: Render questions to the page
})
.catch(err => console.error("Error loading quiz:", err));
