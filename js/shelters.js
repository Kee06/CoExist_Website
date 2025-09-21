// ----- Shelter Manager JS (No JSON, LocalStorage supported) -----

// Load shelters from LocalStorage if available, else use initial data
let shelters = JSON.parse(localStorage.getItem('shelters')) || [
    {name: "Safe Haven", capacity: 50, location: "Downtown"},
    {name: "Helping Hands", capacity: 30, location: "Uptown"},
    {name: "Open Arms", capacity: 100, location: "Midtown"}
];

// Display shelters in table
function displayShelters(list) {
    const tbody = document.querySelector("#shelterTable tbody");
    tbody.innerHTML = "";
    list.forEach((s, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${s.name}</td>
            <td>${s.capacity}</td>
            <td>${s.location}</td>
            <td><button onclick="deleteShelter(${index})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Show all shelters initially
displayShelters(shelters);

// Search by name
function searchShelter() {
    const name = document.getElementById("searchName").value.toLowerCase();
    const filtered = shelters.filter(s => s.name.toLowerCase().includes(name));
    displayShelters(filtered);
}

// Filter by location
function filterByLocation() {
    const loc = document.getElementById("filterLocation").value.toLowerCase();
    const filtered = shelters.filter(s => s.location.toLowerCase() === loc);
    displayShelters(filtered);
}

// Filter by capacity
function filterByCapacity() {
    const cap = parseInt(document.getElementById("filterCapacity").value);
    if (isNaN(cap)) return alert("Enter a valid number!");
    const filtered = shelters.filter(s => s.capacity >= cap);
    displayShelters(filtered);
}

// Add new shelter
function addShelter() {
    const name = document.getElementById("newName").value.trim();
    const capacity = parseInt(document.getElementById("newCapacity").value);
    const location = document.getElementById("newLocation").value.trim();
    
    if (!name || !capacity || !location) return alert("Fill all fields!");
    
    shelters.push({name, capacity, location});
    displayShelters(shelters);
    saveShelters();
    
    // Clear input fields
    document.getElementById("newName").value = "";
    document.getElementById("newCapacity").value = "";
    document.getElementById("newLocation").value = "";
}

// Delete shelter
function deleteShelter(index) {
    if (!confirm(`Delete shelter "${shelters[index].name}"?`)) return;
    shelters.splice(index, 1);
    displayShelters(shelters);
    saveShelters();
}

// Save shelters to LocalStorage
function saveShelters() {
    localStorage.setItem('shelters', JSON.stringify(shelters));
    alert("Shelters saved!");
}
