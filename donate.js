document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("clothForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(this);

      try {
        const response = await fetch("http://localhost:5000/donate", {
          method: "POST",
          body: formData
        });

        const data = await response.json(); // ✅ JSON use kar

        if (response.ok) {
          alert("Donation submitted successfully ✅");
          form.reset();
        } else {
          alert("Something went wrong ❌");
        }
      } catch (err) {
        console.log("FULL ERROR:", err);
        alert(err.message);
      }
    });
  }

  // Image preview
  const previewImage = (input, preview) => {
    if (input && preview) {
      input.addEventListener("change", () => {
        const file = input.files[0];
        if (file) {
          preview.src = URL.createObjectURL(file);
          preview.style.display = "block";
        }
      });
    }
  };

  previewImage(
    document.getElementById("frontImage"),
    document.getElementById("frontPreview")
  );

  previewImage(
    document.getElementById("backImage"),
    document.getElementById("backPreview")
  );

  // Autofill user
  const user = JSON.parse(localStorage.getItem("userData"));
  if (user) {
    const input = document.querySelector('input[name="user"]');
    if (input) input.value = user.name;
  }

  const genderSelect = document.getElementById("gender");
  const categorySelect = document.getElementById("category");

  const maleOptions = [
    "Shirt",
    "T-Shirt",
    "Jeans",
    "Jacket",
    "Kurta"
  ];

  const femaleOptions = [
    "Kurti",
    "Saree",
    "Top",
    "Jeans",
    "Dress"
  ];

  genderSelect.addEventListener("change", function () {

    const selected = this.value;

    categorySelect.innerHTML = '<option value="">Select Cloth Type</option>';

    let options = [];

    if (selected === "Male") {
      options = maleOptions;
    } else if (selected === "Female") {
      options = femaleOptions;
    }

    options.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item;
      opt.textContent = item;
      categorySelect.appendChild(opt);
    });

  });

});