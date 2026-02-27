// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

  // Sidebar switching
  document.querySelectorAll("#sidebarMenu li[data-section]").forEach(item => {
    item.addEventListener("click", function(){

      document.querySelectorAll("#sidebarMenu li").forEach(li => {
        li.classList.remove("active");
      });

      this.classList.add("active");

      document.querySelectorAll(".content-section").forEach(sec => {
        sec.style.display = "none";
      });

      const section = this.getAttribute("data-section");
      const targetSection = document.getElementById(section + "Section");

      if(targetSection){
        targetSection.style.display = "block";
      }

      if(section === "donations"){
        loadTable();
      }
    });
  });

  // Search + Filter Safe Binding
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");

  if(searchInput){
    searchInput.addEventListener("input", loadTable);
  }

  if(statusFilter){
    statusFilter.addEventListener("change", loadTable);
  }

  loadStats();
  loadChart();
});


// ================= LOAD DONATIONS TABLE =================
async function loadTable(){

  const response = await fetch("http://localhost:5000/donations");
  let donations = await response.json();

  const searchValue = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const statusValue = document.getElementById("statusFilter")?.value || "All";

  // Search
  donations = donations.filter(d =>
    d.user.toLowerCase().includes(searchValue) ||
    d.category.toLowerCase().includes(searchValue)
  );

  // Status Filter
  if(statusValue !== "All"){
    donations = donations.filter(d => d.status === statusValue);
  }

  const table = document.getElementById("donationTable");
  if(!table) return;

  table.innerHTML = "";

  donations.forEach(d => {

    table.innerHTML += `
      <tr>
        <td>${d._id.slice(-5)}</td>
        <td>${d.user}</td>
        <td>${d.gender}</td>
        <td>${d.category}</td>
        <td>${d.size}</td>

        <td>
          <select class="form-select form-select-sm"
          onchange="updateStatus('${d._id}', this.value)">
            <option value="Pending" ${d.status==="Pending"?"selected":""}>Pending</option>
            <option value="Approved" ${d.status==="Approved"?"selected":""}>Approved</option>
            <option value="Rejected" ${d.status==="Rejected"?"selected":""}>Rejected</option>
          </select>
        </td>

        <td>
          <button class="btn btn-sm btn-primary me-2"
          onclick='viewDonation(${JSON.stringify(d)})'>
          View
          </button>

          <button class="btn btn-sm btn-danger"
          onclick="deleteDonation('${d._id}')">
          Delete
          </button>
        </td>
      </tr>
    `;
  });

  loadStats();
  loadChart();
}


// ================= UPDATE STATUS =================
async function updateStatus(id, newStatus){

  await fetch(`http://localhost:5000/donation/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus })
  });

  showToast("Status Updated Successfully ✅");
  loadTable();
}


// ================= DELETE DONATION =================
async function deleteDonation(id){

  await fetch(`http://localhost:5000/donation/${id}`, {
    method: "DELETE"
  });

  showToast("Donation Deleted ❌");
  loadTable();
}


// ================= VIEW MODAL =================
function viewDonation(data){

  document.getElementById("modalContent").innerHTML = `
    <p><strong>User:</strong> ${data.user}</p>
    <p><strong>Gender:</strong> ${data.gender}</p>
    <p><strong>Category:</strong> ${data.category}</p>
    <p><strong>Size:</strong> ${data.size}</p>
    <p><strong>Status:</strong> ${data.status}</p>
  `;

  const modal = new bootstrap.Modal(document.getElementById('donationModal'));
  modal.show();
}


// ================= TOAST =================
function showToast(message){

  const toastMsg = document.getElementById("toastMessage");
  if(!toastMsg) return;

  toastMsg.innerText = message;

  const toastEl = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastEl);

  toast.show();
}


// ================= LOGOUT =================
function logout(){
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}


// ================= SIDEBAR TOGGLE =================
function toggleSidebar(){
  document.querySelector(".sidebar").classList.toggle("collapsed");
}


// ================= DARK MODE =================
function toggleTheme(){
  document.body.classList.toggle("dark-mode");
}


// ================= ANIMATED COUNTER =================
function animateValue(id, start, end, duration){

  const obj = document.getElementById(id);
  if(!obj) return;

  let range = end - start;

  if(range === 0){
    obj.innerText = end;
    return;
  }

  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));

  let timer = setInterval(() => {
    current += increment;
    obj.innerText = current;

    if(current == end){
      clearInterval(timer);
    }
  }, stepTime);
}


// ================= LOAD STATS =================
async function loadStats(){

  const response = await fetch("http://localhost:5000/donations");
  const donations = await response.json();

  const pending = donations.filter(d => d.status === "Pending").length;
  const approved = donations.filter(d => d.status === "Approved").length;
  const rejected = donations.filter(d => d.status === "Rejected").length;

  animateValue("totalDonations", 0, donations.length, 500);
  animateValue("pendingCount", 0, pending, 500);
  animateValue("approvedCount", 0, approved, 500);
  animateValue("rejectedCount", 0, rejected, 500);
}


// ================= PIE CHART =================
let donationChart;

async function loadChart(){

  const response = await fetch("http://localhost:5000/donations");
  const donations = await response.json();

  const pending = donations.filter(d => d.status === "Pending").length;
  const approved = donations.filter(d => d.status === "Approved").length;
  const rejected = donations.filter(d => d.status === "Rejected").length;

  const ctx = document.getElementById("donationChart")?.getContext("2d");
  if(!ctx) return;

  if(donationChart){
    donationChart.destroy();
  }

  donationChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Pending", "Approved", "Rejected"],
      datasets: [{
        data: [pending, approved, rejected],
        backgroundColor: ["#ffc107", "#28a745", "#dc3545"]
      }]
    }
  });
}