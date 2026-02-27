document.addEventListener("DOMContentLoaded", function () {

  /* ================= REGISTER ================= */

  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            mobile: document.getElementById("mobile").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Registered Successfully ✅");
          registerForm.reset();
        } else {
          alert(data.message || "Something went wrong ❌");
        }

      } catch (error) {
        alert("Server Error 🚨");
      }
    });
  }


  /* ================= COUNTER ANIMATION ================= */

  const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const increment = target / 200;

      const updateCounter = () => {
        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count);
          setTimeout(updateCounter, 10);
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
      observer.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));



  /* ================= NAVBAR SCROLL EFFECT ================= */

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".custom-navbar");

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    }
  });


  /* ================= DARK MODE ================= */

  window.toggleDarkMode = function () {
    document.body.classList.toggle("dark-mode");
  };


  /* ================= LOADER ================= */

  window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  });


  /* ================= MAGNETIC BUTTON EFFECT ================= */

  const magneticBtns = document.querySelectorAll(".btn-ultimate");

  magneticBtns.forEach(btn => {
    btn.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0, 0)";
    });
  });

});
/* ========== SCROLL REVEAL ========== */

const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

function openModal() {
  document.getElementById("donateModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("donateModal").style.display = "none";
}

// Page Transition

const links = document.querySelectorAll("a");

links.forEach(link => {
  link.addEventListener("click", function (e) {
    const target = this.getAttribute("href");

    if (target && target.includes(".html")) {
      e.preventDefault();
      document.querySelector(".page-transition").classList.add("active");

      setTimeout(() => {
        window.location = target;
      }, 600);
    }
  });
});

// PROGRESS

window.addEventListener("load", () => {
  const progress = document.getElementById("donationProgress");

  if (progress) {
    let percentage = 75; // change value here
    progress.style.width = percentage + "%";
    progress.innerText = percentage + "%";
  }
});

// Toggle Password
function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

// Password Strength
document.getElementById("password")?.addEventListener("input", function () {
  const value = this.value;
  const strength = document.getElementById("strengthFill");

  if (value.length < 4) {
    strength.style.width = "30%";
    strength.style.background = "red";
  } else if (value.length < 8) {
    strength.style.width = "60%";
    strength.style.background = "orange";
  } else {
    strength.style.width = "100%";
    strength.style.background = "green";
  }
});

document.getElementById("registerForm").addEventListener("submit", async function(e){

  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if(result.message === "User Registered"){
    alert("Registration Successful!");
    window.location.href = "login.html";  // 🔥 redirect to login
  }
});

document.getElementById("loginForm").addEventListener("submit", async function(e){

  e.preventDefault();

  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if(result.user){
    localStorage.setItem("userData", JSON.stringify(result.user)); // 🔥 save user
    window.location.href = "user-dashboard.html";
  } else {
    alert("Invalid Login");
  }
});