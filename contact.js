document.addEventListener("DOMContentLoaded", function () {

  const user = JSON.parse(localStorage.getItem("userData"));

  const userIcon = document.getElementById("userIcon");
  const dropdown = document.getElementById("dropdownMenu");
  const profileImg = document.getElementById("profileImg");
  const userInitial = document.getElementById("userInitial");

  if (user) {

    if (user.profileImage) {
      profileImg.src = "https://wearloop-backend.onrender.com/uploads/" + user.profileImage;
      profileImg.style.display = "block";
      userInitial.style.display = "none";
    } else {
      userInitial.innerText = user.name.charAt(0).toUpperCase();
      userInitial.style.display = "block";
      profileImg.style.display = "none";
    }

    dropdown.innerHTML = `
      <a href="user-dashboard.html">Dashboard</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;

  } else {
    userInitial.innerText = "👤";
  }

  // CLICK
  userIcon.addEventListener("click", function(e){
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  // OUTSIDE CLICK
  document.addEventListener("click", function(e){
    if (!e.target.closest(".user-menu")) {
      dropdown.classList.remove("show");
    }
  });

  // LOGOUT
  document.addEventListener("click", function(e){
    if(e.target.id === "logoutBtn"){
      localStorage.removeItem("userData");
      window.location.href = "login.html";
    }
  });

});

// CONTACT FORM SUBMIT
const form = document.getElementById("contactForm");

if(form){
  form.addEventListener("submit", async function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
      const res = await fetch("https://wearloop-backend.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();
      alert(data.message);

      form.reset();

    } catch (err) {
      alert("Server error ❌");
    }
  });
}