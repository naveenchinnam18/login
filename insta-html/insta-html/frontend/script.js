document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const messageDiv = document.getElementById('message');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form refresh

    // Clear previous messages
    messageDiv.style.display = 'none';
    messageDiv.textContent = '';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Make sure you replace this URL with your actual deployed backend URL
    const backendUrl = 'https://gram-sl87.onrender.com/login';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      // We use response.json() to get the JSON body content
      const result = await response.json();

      // Check if the response was successful (HTTP status 200-299)
      if (response.ok) {
        displayMessage(result.message, 'success');
        loginForm.reset(); // Clear the form fields
      } else {
        // If the server returned an error (e.g., 401, 500), display it
        displayMessage(result.message || 'An unknown error occurred.', 'error');
      }
    } catch (err) {
      // This catches network errors or issues with the fetch itself
      console.error('Fetch Error:', err);
      displayMessage('Could not connect to the server. Please try again later.', 'error');
    }
  });

  function displayMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = type; // 'success' or 'error'
    messageDiv.style.display = 'block';
  }
});
