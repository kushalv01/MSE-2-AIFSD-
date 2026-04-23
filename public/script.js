const API = "/api/auth";

const messageDiv = document.getElementById("message");

function showMessage(text, type) {
  messageDiv.innerText = text;
  messageDiv.className = type;
}

// Register
async function register() {
  try {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      showMessage("✅ Registered successfully!", "success");
    } else {
      showMessage("❌ " + data.message, "error");
    }

  } catch (err) {
    showMessage("❌ Server error", "error");
  }
}

// Login
async function login() {
  try {
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      showMessage("✅ Login successful!", "success");
    } else {
      showMessage("❌ " + data.message, "error");
    }

  } catch (err) {
    showMessage("❌ Server error", "error");
  }
}

// Profile
async function getProfile() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return showMessage("❌ Please login first", "error");
    }

    const res = await fetch(`${API}/profile`, {
      headers: {
        "Authorization": token
      }
    });

    const data = await res.json();

    if (res.ok) {
      showMessage("👤 User ID: " + data.user.userId, "success");
    } else {
      showMessage("❌ " + data.message, "error");
    }

  } catch (err) {
    showMessage("❌ Server error", "error");
  }
}