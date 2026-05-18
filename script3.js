// ===== Background Icons =====
document.addEventListener("DOMContentLoaded", function () {

const icons = ["❤️","🎁","👕","👗","🤝","👜","📦","🙏","♻️"];
const bg = document.getElementById("bgIcons");

for (let i = 0; i < 30; i++) {
  const span = document.createElement("span");
  span.innerText = icons[Math.floor(Math.random() * icons.length)];
  span.style.left = Math.random() * 100 + "vw";
  span.style.animationDuration = (6 + Math.random() * 10) + "s";
  span.style.fontSize = (18 + Math.random() * 30) + "px";
  bg.appendChild(span);
}

});

// ===== Gender Category Logic =====

const maleCategories = [
"Shirt","T-Shirt","Hoodie","Sweater","Tank Top",
"Sweat Shirt","Pants","Trousers","Jeans","Shorts"
];

const femaleCategories = [
"Kurti","Top","Sweater","Frock Top","Saree",
"Shirt","T-Shirt","Suit","Blazer","Jeans",
"Pants","Plazo","Shorts","Lower","Skirt",
"Bodysuit","Sundress"
];

const genderSelect = document.getElementById("gender");
const categorySelect = document.getElementById("category");

genderSelect.addEventListener("change", function(){

categorySelect.innerHTML = "<option value=''>Select Category</option>";

let categories = this.value === "male" ? maleCategories : femaleCategories;

categories.forEach(cat => {
let option = document.createElement("option");
option.textContent = cat;
categorySelect.appendChild(option);
});

});

// ===== Verification Simulation =====

document.getElementById("clothForm").addEventListener("submit", function(e){
e.preventDefault();

const status = document.getElementById("statusMsg");

status.innerHTML = "⏳ Your cloth is under verification...";

setTimeout(function(){

let approved = Math.random() > 0.5;

if(approved){
status.innerHTML =
"✅ Verified by Team ✔️<br><br>" +
"<strong>Choose Drop Location:</strong><br><br>" +
"<button class='btn'>Delhi Hub</button> " +
"<button class='btn'>Noida Hub</button>";
}
else{
status.innerHTML =
"❌ Rejected by Team<br>" +
"Reason: Low image clarity or damaged cloth.";
}

}, 3000);

});
