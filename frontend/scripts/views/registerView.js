import { registerUser } from '../services/apiService.js';

export function renderRegister() {
    const registerFormHTML = `
        <form id="registerForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    `;
    document.querySelector('#app').innerHTML = registerFormHTML;
    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const result = await registerUser(username, password);
        if (result.message) {
            console.log(result.message);  // Assuming backend sends some message on success/failure
        }
    });
}
