// Sample data of entrepreneurs and interns with their expertise
let entrepreneurs = [
  {
    name: "John Doe",
    expertise: ["Marketing", "Sales"],
    imageUrl:
      "https://static.generated.photos/vue-static/face-generator/landing/wall/5.jpg",
  },
  {
    name: "Jane Smith",
    expertise: ["Finance", "Management"],
    imageUrl:
      "https://images.generated.photos/L4A6eUKvgn7wVNqfEigkEPFfvdZTlvMfmK6kqbxIEGs/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Njg5NjYxLmpwZw.jpg",
  },
];

let interns = [
  {
    name: "Alice Johnson",
    expertise: ["Marketing", "Social Media"],
    imageUrl:
      "https://images.generated.photos/_ZsARs1FxGp77W9zClDdzgZ_7F5s70cxSJUhAdVhrFM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92Ml8w/NTc0NzI4LmpwZw.jpg",
  },
  {
    name: "Bob Lee",
    expertise: ["Finance", "Data Analysis"],
    imageUrl:
      "https://images.generated.photos/rNCJvPv6bOL067_jY8HQD-0deMxFOKs4otnn18ic0lc/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92Ml8w/ODU4MjQ2LmpwZw.jpg",
  },
];


// Function to automatically match entrepreneurs with interns based on expertise
function autoMatch() {
  // Clear previous matches
  const matchedList = document.getElementById("matchedList");
  if (matchedList) {
    matchedList.innerHTML = "";
  } else {
    // Create a new list for displaying matches
    const container = document.querySelector(".container");
    const div = document.createElement("div");
    div.id = "matchedList";
    container.appendChild(div);
  }

  // Iterate over each entrepreneur
  entrepreneurs.forEach((entrepreneur) => {
    // Iterate over each intern
    interns.forEach((intern) => {
      // Check if any expertise of the entrepreneur matches any expertise of the intern
      const commonExpertise = entrepreneur.expertise.some((expertise) =>
        intern.expertise.includes(expertise)
      );

      // If there's a match, display it
      if (commonExpertise) {
        const matchItem = document.createElement("div");
        matchItem.className = "alert alert-success";
        matchItem.innerHTML = `
    <strong>Match Found :</strong> ผู้ประกอบการ ${entrepreneur.name} - นักศึกษาฝึกงาน ${intern.name}`;
        const matchedList = document.getElementById("matchedList");
        matchedList.appendChild(matchItem);
      }
    });
  });
}

// Call autoMatch function whenever data is added
function addEntrepreneurAndMatch(name, expertise, imageUrl) {
  addEntrepreneur(name, expertise, imageUrl);
  autoMatch();
}

function addInternAndMatch(name, expertise, imageUrl) {
  addIntern(name, expertise, imageUrl);
  autoMatch();
}



// Function to populate entrepreneurs list
function populateEntrepreneurs() {
  const entrepreneursList = document.getElementById("entrepreneursList");
  entrepreneursList.innerHTML = "";
  entrepreneurs.forEach((entrepreneur) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
      <img src="${entrepreneur.imageUrl}" alt="${
      entrepreneur.name
    }" class="mr-3" style="width:50px;height:50px;">
      ${entrepreneur.name} (${entrepreneur.expertise.join(", ")})
    `;
    entrepreneursList.appendChild(listItem);
  });
}

function populateInterns() {
  const internsList = document.getElementById("internsList");
  internsList.innerHTML = "";
  interns.forEach((intern) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
      <img src="${intern.imageUrl}" alt="${
      intern.name
    }" class="mr-3" style="width:50px;height:50px;">
      ${intern.name} (${intern.expertise.join(", ")})
    `;
    internsList.appendChild(listItem);
  });
}



// Function to add entrepreneur
function addEntrepreneur(name, expertise, imageUrl) {
  entrepreneurs.push({ name, expertise, imageUrl });
  populateEntrepreneurs();
}

function addIntern(name, expertise, imageUrl) {
  interns.push({ name, expertise, imageUrl });
  populateInterns();
}


// Call functions to populate lists on page load
populateEntrepreneurs();
populateInterns();


// Form submission event listeners with auto matching
document.getElementById("entrepreneurForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("entrepreneurName").value.trim();
  const expertise = document.getElementById("entrepreneurExpertise").value.trim().split(",").map((item) => item.trim());
  const imageUrl = document.getElementById("entrepreneurImage").value.trim(); // ดึงค่า URL รูปภาพจาก input
  if (name && expertise.length > 0) {
    addEntrepreneurAndMatch(name, expertise, imageUrl); // เพิ่ม imageUrl เข้าไปในฟังก์ชัน addEntrepreneurAndMatch
    document.getElementById("entrepreneurName").value = "";
    document.getElementById("entrepreneurExpertise").value = "";
    document.getElementById("entrepreneurImage").value = ""; // Reset ค่า input
  } else {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
  }
});

document.getElementById("internForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("internName").value.trim();
  const expertise = document.getElementById("internExpertise").value.trim().split(",").map((item) => item.trim());
  const imageUrl = document.getElementById("internImage").value.trim(); // ดึงค่า URL รูปภาพจาก input
  if (name && expertise.length > 0) {
    addInternAndMatch(name, expertise, imageUrl); // เพิ่ม imageUrl เข้าไปในฟังก์ชัน addInternAndMatch
    document.getElementById("internName").value = "";
    document.getElementById("internExpertise").value = "";
    document.getElementById("internImage").value = ""; // Reset ค่า input
  } else {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
  }
});


