document.addEventListener("DOMContentLoaded", function () {

  // ================= REGISTER =================
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async function(e) {

      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {

        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            mobile,
            password
          })
        });

        const result = await response.json();

        if (result.message) {
          alert(result.message);
          window.location.href = "login.html";  // 🔥 redirect
        }

      } catch (error) {
        console.log(error);
        alert("Registration failed!");
      }

    });
  }


  // ================= LOGIN =================
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {

      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {

        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.user) {

          localStorage.setItem("userData", JSON.stringify(result.user));

          window.location.href = "user-dashboard.html";

        } else {
          alert(result.message || "Invalid Login");
        }

      } catch (error) {
        console.log(error);
        alert("Login failed!");
      }

    });
  }


  // ================= BACKGROUND ICONS =================
  const icons = ["❤️","🎁","👟","🤝","🧢","📦","👜","🙏","👕","♻️"];
  const bg = document.getElementById("bgIcons");

  if (bg) {
    for (let i = 0; i < 25; i++) {
      const span = document.createElement("span");
      span.innerText = icons[Math.floor(Math.random() * icons.length)];

      span.style.left = Math.random() * 100 + "vw";
      span.style.animationDuration = (5 + Math.random() * 10) + "s";
      span.style.fontSize = (20 + Math.random() * 30) + "px";

      bg.appendChild(span);
    }
  }

});