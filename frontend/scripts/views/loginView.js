import { loginUser } from '../services/apiService.js';

export function renderLogin() {
    const loginFormHTML = `
        <form id="loginForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `;
    document.querySelector('#app').innerHTML = loginFormHTML;
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const response = await loginUser(username, password);
        if (response.ok) {
            console.log('Login successful');
            // Redirect user or handle logged-in state
        } else {
            console.error('Login failed');
        }
    });
}
