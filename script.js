const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');
const searchInput = document.getElementById('searchInput');
let allUsers = [];

// Fetch Users
async function fetchUsers() {
    userContainer.innerHTML = "<p>Loading...</p>"; 
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        allUsers = await response.json();
        displayUsers(allUsers);
    } catch (error) {
        userContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

// Display Users
function displayUsers(users) {
    userContainer.innerHTML = ''; 
    if (users.length === 0) {
        userContainer.innerHTML = `<p>No users found</p>`;
        return;
    }

    users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('user-card');
       card.innerHTML = `
    <a href="user.html?id=${user.id}" class="user-link">
        <h3><i class="fas fa-user"></i> ${user.name}</h3>
        <p><i class="fas fa-envelope"></i> ${user.email}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${user.address.street}, ${user.address.city}</p>
        <p><i class="fas fa-phone"></i> ${user.phone}</p>
    </a>
`;

        userContainer.appendChild(card);
    });
}

// Search Users
function searchUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allUsers.filter(user => user.name.toLowerCase().includes(searchTerm));
    displayUsers(filtered);
}

// Event Listeners
reloadBtn.addEventListener('click', fetchUsers);
searchInput.addEventListener('input', searchUsers);

// Initial Fetch
fetchUsers();


