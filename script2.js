document.addEventListener("DOMContentLoaded", function () {

  // ================= REGISTER =================
  const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const mobile = document.getElementById("mobile")?.value;
    const password = document.getElementById("password")?.value;

    if (!name || !email || !password) {
      alert("Fill all fields ⚠️");
      return;
    }

    try {
      const res = await fetch("https://wearloop-backend.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, mobile, password })
      });

      const data = await res.json();

      alert(data.message);

      if (data.message.includes("success")) {
        window.location.href = "login.html";
      }

    } catch {
      alert("Registration failed ❌");
    }
  });
}

  // ================= LOGIN =================
 const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email =
      document.getElementById("loginEmail")?.value ||
      document.getElementById("email")?.value;

    const password =
      document.getElementById("loginPassword")?.value ||
      document.getElementById("password")?.value;

    if (!email || !password) {
      alert("Enter email & password ⚠️");
      return;
    }

    try {
      const res = await fetch("https://wearloop-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.user) {
        localStorage.setItem("userData", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          localStorage.setItem("adminLoggedIn", "true");
          window.location.href = "admin.html";
        } else {
          window.location.href = "index.html";
        }

      } else {
        alert(data.message || "Login failed ❌");
      }

    } catch (err) {
      console.log(err);
      alert("Server error 🚨");
    }
  });
}

/* ===== FINAL USER DROPDOWN ===== */

const userIcon = document.getElementById("userIcon");
const dropdown = document.getElementById("dropdownMenu");
const profileImg = document.getElementById("profileImg");

const user = JSON.parse(localStorage.getItem("userData"));

if (userIcon && dropdown) {

  if (user) {

    // PROFILE IMAGE / NAME
    if (user.profileImage) {
      profileImg.src = "https://wearloop-backend.onrender.com/uploads/" + user.profileImage;
      profileImg.style.display = "block";
    } else {
      userIcon.innerText = user.name.charAt(0).toUpperCase();
    }

    // DROPDOWN (LOGGED IN)
    dropdown.innerHTML = `
      <a href="user-dashboard.html">Dashboard</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;

  } else {

    // NOT LOGGED IN
    userIcon.innerText = "👤";

    dropdown.innerHTML = `
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `;
  }

  // CLICK
  userIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  // OUTSIDE CLICK
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".user-menu")) {
      dropdown.classList.remove("show");
    }
  });
}

// LOGOUT
document.addEventListener("click", function (e) {
  if (e.target.id === "logoutBtn") {
    localStorage.removeItem("userData");
    window.location.href = "index.html";
  }
});

});

// document.getElementById("loginForm").addEventListener("submit", async function(e) {
//   e.preventDefault();

//   const btn = document.querySelector(".btn");
//   const card = document.querySelector(".modal-box");

//   btn.classList.add("loading");
//   btn.innerText = "Logging in...";

//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;

//   const response = await fetch("https://wearloop-backend.onrender.com/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   });

//   const data = await response.json();

//   if(data.user){
//     localStorage.setItem("userData", JSON.stringify(data.user));

//     card.classList.add("fade-out");

//     setTimeout(() => {
//       window.location.href = "user-dashboard.html";
//     }, 600);

//   } else {
//     alert(data.message);
//     btn.classList.remove("loading");
//     btn.innerText = "Login";
//   }
// });

