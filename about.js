document.addEventListener("DOMContentLoaded", function () {

  const userIcon = document.getElementById("userIcon");
  const dropdown = document.getElementById("dropdownMenu");
  const profileImg = document.getElementById("profileImg");

  const user = JSON.parse(localStorage.getItem("userData"));

  // USER DATA
  if (user && userIcon && dropdown) {

    if (user.profileImage) {
      profileImg.src = "https://wearloop-backend.onrender.com/uploads/" + user.profileImage;
      profileImg.style.display = "block";
    } else {
      userIcon.innerText = user.name.charAt(0).toUpperCase();
    }

    dropdown.innerHTML = `
      <a href="user-dashboard.html">Dashboard</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;
  } else {
    userIcon.innerText = "👤";
  }

  // 🔥 DROPDOWN CLICK FIX
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

  // LOGOUT
  document.addEventListener("click", function (e) {
    if (e.target.id === "logoutBtn") {
      localStorage.removeItem("userData");
      window.location.href = "index.html";
    }
  });

});