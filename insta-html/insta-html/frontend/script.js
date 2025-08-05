document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const response = await fetch('https://https://login-2-tq44.onrender.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    alert('Login Successful! Redirecting...');
    window.location.href = 'index.html'; // Create this if needed
  } else {
    alert('Login failed. Please try again.');
  }
});
