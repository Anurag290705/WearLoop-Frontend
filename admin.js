// 🔥 BASE URL
const BASE_URL = "https://wearloop-backend.onrender.com";

let myChart;

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  setupSidebar();
  loadDashboard();
  loadNotifications();

  const searchInput = document.getElementById("userSearch");
  if (searchInput) {
    searchInput.addEventListener("input", loadUsers);
  }
});


// ================= SIDEBAR =================
function setupSidebar(){
  document.querySelectorAll(".sidebar ul li[data-section]").forEach(item => {

    item.addEventListener("click", function(){

      document.querySelectorAll(".sidebar ul li")
      .forEach(li => li.classList.remove("active"));

      this.classList.add("active");

      document.querySelectorAll(".content-section")
      .forEach(sec => sec.style.display = "none");

      const section = this.getAttribute("data-section");
      document.getElementById(section + "Section").style.display = "block";

      if(section === "users") loadUsers();
      if(section === "donations") loadDashboard();
    });
  });
}


// ================= DASHBOARD =================
async function loadDashboard(){
  try{
    const response = await fetch(`${BASE_URL}/donations`);
    const donations = await response.json();

    const total = donations.length;
    const pending = donations.filter(d => d.status === "Pending").length;
    const approved = donations.filter(d => d.status === "Approved").length;
    const rejected = donations.filter(d => d.status === "Rejected").length;

    document.getElementById("totalDonations").innerText = total;
    document.getElementById("pendingCount").innerText = pending;
    document.getElementById("approvedCount").innerText = approved;
    document.getElementById("rejectedCount").innerText = rejected;

    loadTable(donations);
    loadChart(pending, approved, rejected);

  } catch(err){
    console.log(err);
    alert("Server error ❌");
  }
}


// ================= TABLE =================
function loadTable(donations){
  const table = document.getElementById("donationTable");
  if(!table) return;

  table.innerHTML = "";

  donations.forEach(d => {
    table.innerHTML += `
<tr>
<td>${d.user}</td>
<td>${d.category}</td>
<td>${d.size}</td>
<td>${d.condition || "-"}</td>
<td>${d.description || "-"}</td>

<td>
<img src="${d.frontImage}" class="donation-img">
<img src="${d.backImage}" class="donation-img">
</td>

<td>
<span class="
${d.status === "Pending" ? "text-warning" : ""}
${d.status === "Approved" ? "text-success" : ""}
${d.status === "Rejected" ? "text-danger" : ""}">
${d.status}
</span>
</td>

<td>
<button onclick="updateStatus('${d._id}','Approved')">✓</button>
<button onclick="updateStatus('${d._id}','Rejected')">✕</button>
<button onclick="deleteDonation('${d._id}')">🗑</button>
</td>
</tr>`;
  });
}


// ================= UPDATE =================
async function updateStatus(id, status){
  await fetch(`${BASE_URL}/donation/${id}`, {
    method:"PUT",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({status})
  });

  loadDashboard();
  loadNotifications();
}


// ================= DELETE =================
async function deleteDonation(id){
  await fetch(`${BASE_URL}/donation/${id}`, {method:"DELETE"});
  loadDashboard();
  loadNotifications();
}


// ================= USERS =================
async function loadUsers(){
  const response = await fetch(`${BASE_URL}/users`);
  let users = await response.json();

  const search = document.getElementById("userSearch")?.value.toLowerCase() || "";

  users = users.filter(u =>
    u.name.toLowerCase().includes(search) ||
    u.email.toLowerCase().includes(search)
  );

  const table = document.getElementById("usersTable");
  table.innerHTML = "";

  users.forEach(u => {
    table.innerHTML += `
<tr>
<td>${u.name}</td>
<td>${u.email}</td>
<td>${u.mobile}</td>
<td>${u.role}</td>
<td>
<button onclick="deleteUser('${u._id}')">Delete</button>
</td>
</tr>`;
  });
}


// ================= NOTIFICATIONS =================
function toggleNotifications(){
  const panel = document.getElementById("notificationPanel");
  panel.style.display =
    panel.style.display === "block" ? "none" : "block";
}

async function loadNotifications(){
  const response = await fetch(`${BASE_URL}/new-donations`);
  const data = await response.json();

  document.getElementById("notifyCount").innerText = data.length;

  document.getElementById("notificationList").innerHTML =
    data.map(d => `<div>${d.user} donated</div>`).join("");
}


// ================= PROFILE =================
function toggleProfileMenu(){
  const menu = document.getElementById("profileMenu");
  menu.style.display =
    menu.style.display === "block" ? "none" : "block";
}


// ================= LOGOUT =================
function logout(){
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}


// ================= CHART =================
function loadChart(pending, approved, rejected){

  const ctx = document.getElementById("donationChart");

  if(!ctx) return;

  if(myChart){
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Pending", "Approved", "Rejected"],
      datasets: [{
        data: [pending, approved, rejected],
        backgroundColor: ["#ffc107", "#28a745", "#dc3545"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });

}

// ================= IMAGE PREVIEW =================

document.addEventListener("click", function(e){

  if(e.target.classList.contains("donation-img")){

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    modal.style.display = "flex";
    modalImg.src = e.target.src;
  }

});

// CLOSE MODAL

document.querySelector(".close-modal")
.addEventListener("click", function(){

  document.getElementById("imageModal")
  .style.display = "none";

});