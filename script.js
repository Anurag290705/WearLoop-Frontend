document.addEventListener("DOMContentLoaded", function () {

  /* ================= REGISTER ================= */

  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: document.getElementById("name")?.value.trim(),
        age: document.getElementById("age")?.value.trim(),
        mobile: document.getElementById("mobile")?.value.trim(),
        email: document.getElementById("email")?.value.trim(),
        password: document.getElementById("password")?.value.trim()
      };

      // Validation
      if (!data.name || !data.email || !data.password) {
        alert("Please fill all required fields ⚠️");
        return;
      }

      try {
        const response = await fetch("https://wearloop-backend.onrender.com/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          alert("Registered Successfully ✅");
          registerForm.reset();
          window.location.href = "login.html";
        } else {
          alert(result.message || "Registration failed ❌");
        }

      } catch (error) {
        alert("Server error 🚨 Try again later");
      }
    });
  }


  /* ================= LOGIN ================= */

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = {
        email: document.getElementById("email")?.value.trim(),
        password: document.getElementById("password")?.value.trim()
      };

      if (!data.email || !data.password) {
        alert("Enter email & password ⚠️");
        return;
      }

      try {
        const response = await fetch("https://wearloop-backend.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.user) {
          localStorage.setItem("userData", JSON.stringify(result.user));
          window.location.href = "user-dashboard.html";
        } else {
          alert("Invalid login ❌");
        }

      } catch (err) {
        alert("Server error 🚨");
      }
    });
  }


  /* ================= NAVBAR SCROLL ================= */

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".custom-navbar");

    if (navbar) {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
    }
  });


  /* ================= LOADER ================= */

  window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  });


  /* ================= SCROLL REVEAL ================= */

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


  /* ================= SMOOTH SCROLL ================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  /* ================= DONATION PROGRESS ================= */

  const progress = document.getElementById("donationProgress");

  if (progress) {
    let percentage = 75; // change this value
    progress.style.width = percentage + "%";
    progress.innerText = percentage + "%";
  }


  /* ================= PASSWORD TOGGLE ================= */

  window.togglePassword = function () {
    const pass = document.getElementById("password");
    if (pass) {
      pass.type = pass.type === "password" ? "text" : "password";
    }
  };


  /* ================= PASSWORD STRENGTH ================= */

  const passwordInput = document.getElementById("password");
  const strength = document.getElementById("strengthFill");

  if (passwordInput && strength) {
    passwordInput.addEventListener("input", function () {
      const value = this.value;

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
  }


  /* ================= PAGE TRANSITION ================= */

  const links = document.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const target = this.getAttribute("href");

      if (target && target.includes(".html")) {
        e.preventDefault();

        const transition = document.querySelector(".page-transition");
        if (transition) {
          transition.classList.add("active");
        }

        setTimeout(() => {
          window.location.href = target;
        }, 500);
      }
    });
  });

  /* ===== USER DROPDOWN FIX ===== */

  const userIcon = document.getElementById("userIcon");
  const dropdown = document.getElementById("dropdownMenu");
  const profileImg = document.getElementById("profileImg");

  const user = JSON.parse(localStorage.getItem("userData"));

  if (user && userIcon && dropdown) {

    // 🔥 PHOTO / INITIAL
    if (user.profileImage) {
      profileImg.src = "https://wearloop-backend.onrender.com/uploads/" + user.profileImage;
      profileImg.style.display = "block";
    } else {
      userIcon.innerText = user.name.charAt(0).toUpperCase();
    }

    // 🔥 DROPDOWN CHANGE
    dropdown.innerHTML = `
    <a href="user-dashboard.html">Dashboard</a>
    <a href="#" id="logoutBtn">Logout</a>
  `;
  }
   else {
      // Default icon
      userIcon.innerText = "👤"
    }

  // 🔥 CLICK EVENT
  if (userIcon && dropdown) {

    userIcon.addEventListener("click", function (e) {
      e.stopPropagation();

      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".user-menu")) {
        dropdown.style.display = "none";
      }
    });

  }

  // 🔥 LOGOUT
  document.addEventListener("click", function (e) {
    if (e.target.id === "logoutBtn") {
      localStorage.removeItem("userData");
      window.location.href = "index.html";
    }
  });

});


/* ================= MODAL ================= */

function openModal() {
  const modal = document.getElementById("donateModal");
  if (modal) modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("donateModal");
  if (modal) modal.style.display = "none";
}

// Footer

async function subscribe() {
  const email = document.getElementById("newsletterEmail").value;

  if (!email) {
    alert("Enter email first ⚠️");
    return;
  }

  try {
    const res = await fetch("https://wearloop-backend.onrender.com/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    alert(data.message);
    document.getElementById("newsletterEmail").value = "";

  } catch (err) {
    alert("Server error ❌");
  }
}

// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    const inc = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };

  update();
});

const slider = document.getElementById("slider");
const afterImg = document.getElementById("afterImg");

if (slider && afterImg) {
  slider.addEventListener("input", function () {
    const value = this.value;
    afterImg.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
  });
}

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".custom-navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

window.addEventListener("load", function () {
  const transition = document.querySelector(".page-transition");
  if (transition) {
    transition.classList.add("active");
  }
});