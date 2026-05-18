document.addEventListener("DOMContentLoaded", function () {

  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  /* USER INFO */
  const userInfo = document.getElementById("userInfo");

  if (userInfo) {
    userInfo.innerHTML = `
      <p><b>Name:</b> ${user.name}</p>
      <p><b>Email:</b> ${user.email}</p>
    `;
  }

  /* PROFILE IMAGE (DASHBOARD) */
  const profileImg = document.getElementById("profileImg");
  const profileCircle = document.getElementById("profileCircle");

  if (user.profileImage) {
    profileImg.src = "https://wearloop-backend.onrender.com/uploads/" + user.profileImage;
    profileImg.style.display = "block";
  } else {
    profileCircle.innerText = user.name.charAt(0).toUpperCase();
  }

  /* ===== NAVBAR USER ICON ===== */

  const userIcon = document.getElementById("userIcon");
  const dropdown = document.getElementById("dropdownMenu");
  const navbarImg = document.getElementById("navbarProfileImg");
  const userInitial = document.getElementById("userInitial");

  if (user.profileImage) {
    navbarImg.src = "https://wearloop-backend.onrender.com/uploads/" + user.profileImage;
    navbarImg.style.display = "block";
    userInitial.style.display = "none";
  } else {
    userInitial.innerText = user.name.charAt(0).toUpperCase();
    userInitial.style.display = "block";
    navbarImg.style.display = "none";
  }

  /* DROPDOWN */
  dropdown.innerHTML = `
    <a href="user-dashboard.html">Dashboard</a>
    <a href="#" id="logoutBtn">Logout</a>
  `;

  userIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".user-menu")) {
      dropdown.classList.remove("show");
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target.id === "logoutBtn") {
      localStorage.removeItem("userData");
      window.location.href = "login.html";
    }
  });

  loadDonations(user.email);

});


/* DONATIONS */
async function loadDonations(email) {
  try {
    const res = await fetch(`https://wearloop-backend.onrender.com/user-donations/${email}`);
    const data = await res.json();

    const table = document.getElementById("donationTable");
    table.innerHTML = "";

    data.forEach(d => {
      table.innerHTML += `
        <tr>
          <td>${d.category}</td>
          <td>${d.size}</td>
          <td>${d.condition}</td>
          <td>${d.status}</td>
        </tr>
      `;
    });

  } catch {
    alert("Error loading donations ❌");
  }

  // STATS CALCULATION
let total = data.length;
let approved = data.filter(d => d.status === "Approved").length;
let pending = data.filter(d => d.status === "Pending").length;

// UPDATE UI
document.getElementById("totalDonations").innerText = total;
document.getElementById("approvedDonations").innerText = approved;
document.getElementById("pendingDonations").innerText = pending;

// PROGRESS
let percent = total ? (approved / total) * 100 : 0;
document.getElementById("progressFill").style.width = percent + "%";

// ACTIVITY LIST
const activityList = document.getElementById("activityList");
activityList.innerHTML = "";

data.slice(-5).reverse().forEach(d => {
  activityList.innerHTML += `<li>${d.category} - ${d.status}</li>`;
});

}


/* UPLOAD IMAGE */
async function uploadProfile() {

  const file = document.getElementById("profileInput").files[0];

  if (!file) {
    alert("Select image ⚠️");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("https://wearloop-backend.onrender.com/upload-profile", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  const user = JSON.parse(localStorage.getItem("userData"));
  user.profileImage = data.image;

  localStorage.setItem("userData", JSON.stringify(user));

  alert("Profile Updated ✅");
  location.reload();
}


function logout() {
  localStorage.removeItem("userData");
  window.location.href = "login.html";
}

const userName = document.getElementById("userName");
if(userName){
  userName.innerText = user.name;
}

