document.addEventListener('DOMContentLoaded', () => {
    const adoptionListings = document.getElementById('adoption-listings');

    // Function to render the adoption cards
    function renderAdoptionCards(animals) {
        adoptionListings.innerHTML = ''; // Clear previous listings
        animals.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${animal.image}" alt="${animal.name}">
                <h3>${animal.name} (${animal.type})</h3>
                <p>Age: ${animal.age}</p>
                <p class="small">Health: ${animal.health}</p>
                <p>${animal.desc}</p>
                <button onclick="showInterest('${animal.name}')">I'm interested</button>
            `;
            adoptionListings.appendChild(card);
        });
    }

    // Load data from the JSON file and render initially
    fetchJSON('assets/data/adoption.json')
        .then(data => {
            window.allAnimals = data; // Store the original data globally for filtering
            renderAdoptionCards(data);
        })
        .catch(error => {
            console.error(error);
            adoptionListings.innerHTML = '<p>Failed to load adoption listings.</p>';
        });
});

// Function to filter animals (called by the buttons in adoption.html)
function filterAnimals(type) {
    const filtered = (type === 'All')
        ? window.allAnimals
        : window.allAnimals.filter(animal => animal.type === type);
    
    document.getElementById('adoption-listings').innerHTML = ''; // Clear
    
    filtered.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}">
            <h3>${animal.name} (${animal.type})</h3>
            <p>Age: ${animal.age}</p>
            <p class="small">Health: ${animal.health}</p>
            <p>${animal.desc}</p>
            <button onclick="showInterest('${animal.name}')">I'm interested</button>
        `;
        document.getElementById('adoption-listings').appendChild(card);
    });
}

// Function for the "I'm interested" button
function showInterest(animalName) {
    alert(`Thank you for your interest in ${animalName}! We will contact you soon.`);
}
