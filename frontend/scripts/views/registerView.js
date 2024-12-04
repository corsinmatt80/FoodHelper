import { registerUser } from '../services/apiService.js';

export function renderRegister() {
 const modalHTML = `
        <div id="registerModal" style="
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
                <h2>Register</h2>
                <form id="registerForm">
                    <input type="text" id="username" placeholder="Username" required style="width: 90%; padding: 10px; margin: 10px 0;">
                    <input type="password" id="password" placeholder="Password" required style="width: 90%; padding: 10px; margin: 10px 0;">
                    <button type="submit" style="
                        background-color: #28a745;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;">Register</button>
                </form>
            </div>
        </div>
    `;
 // Append the modal to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add event listener to close the modal
    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', () => {
        document.getElementById('registerModal').remove();
    });

    // Handle register form submission
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const result = await registerUser(username, password);
            if (result.message) {
                console.log(result.message);
                alert(result.message); // Show success or error message
                document.getElementById('registerModal').remove(); // Close the modal on success
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    });
}