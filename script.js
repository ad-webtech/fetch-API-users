const userContainer = document.getElementById("userContainer");
const modal = document.getElementById("userModal");
const closeBtn = document.querySelector(".closeBtn");
const addUserBtn = document.getElementById("addUserBtn");
const userForm = document.getElementById("userForm");
const modalTitle = document.getElementById("modalTitle");

let users = [];
let editIndex = null;

// Fetch API Data
async function fetchUsers() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        users = await res.json();
        renderUsers();
    } catch (error) {
        alert("Error fetching users. Please check your internet.");
    }
}

// Render Users
function renderUsers() {
    userContainer.innerHTML = "";
    users.forEach((user, index) => {
        const card = document.createElement("div");
        card.classList.add("user-card");
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><i class="fas fa-envelope"></i> ${user.email}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${user.address.street}, ${user.address.city}</p>
            <div class="card-buttons">
                <button class="editBtn"><i class="fas fa-edit"></i> Edit</button>
                <button class="deleteBtn"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;

        card.querySelector(".editBtn").addEventListener("click", () => openModal(index));
        card.querySelector(".deleteBtn").addEventListener("click", () => deleteUser(index));
        userContainer.appendChild(card);
    });
}

// Open Modal
function openModal(index = null) {
    modal.style.display = "block";
    if (index !== null) {
        editIndex = index;
        modalTitle.textContent = "Edit User";
        const user = users[index];
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("address").value = `${user.address.street}, ${user.address.city}`;
    } else {
        editIndex = null;
        modalTitle.textContent = "Add User";
        userForm.reset();
    }
}

// Close Modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

// Save User
userForm.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const [street, city] = address.split(",");

    if (editIndex !== null) {
        users[editIndex] = { ...users[editIndex], name, email, address: { street: street.trim(), city: city.trim() } };
    } else {
        users.push({ id: Date.now(), name, email, address: { street: street.trim(), city: city.trim() } });
    }
    modal.style.display = "none";
    renderUsers();
};

// Delete User
function deleteUser(index) {
    if (confirm("Are you sure you want to delete this user?")) {
        users.splice(index, 1);
        renderUsers();
    }
}

addUserBtn.onclick = () => openModal();

fetchUsers();
