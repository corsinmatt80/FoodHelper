import { loginUser } from '../services/apiService.js';

export function renderLogin() {
    // Create the modal structure dynamically
    const modalHTML = `
        <div id="loginModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;">
            <div style="
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                max-width: 400px;
                width: 90%;
                text-align: center;
                position: relative;">
                <button id="closeModal" style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;">&times;</button>
                <h2>Login</h2>
                <form id="loginForm">
                    <input type="text" id="username" placeholder="Username" required style="width: 90%; padding: 10px; margin: 10px 0;">
                    <input type="password" id="password" placeholder="Password" required style="width: 90%; padding: 10px; margin: 10px 0;">
                    <button type="submit" style="
                        background-color: #007BFF;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;">Login</button>
                </form>
            </div>
        </div>
    `;

    // Append the modal to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add event listener to close the modal
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('loginModal').remove();
    });

    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const response = await loginUser(username, password);
        if (response.ok) {
            console.log('Login successful');
            localStorage.setItem('username', username);
            displayUsername(username);
            document.getElementById('loginModal').remove(); // Close the modal
        } else {
            console.error('Login failed');
        }
    });
}

function displayUsername(username) {
    const userDisplay = document.querySelector('#userDisplay');
    if (userDisplay) {
        userDisplay.textContent = username;
    }
}
