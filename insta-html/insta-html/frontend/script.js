<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Login</title>
</head>
<body>
  <h1>Login</h1>
  <form id="loginForm">
    <input type="text" id="username" placeholder="Username" required />
    <input type="password" id="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>

  <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        const response = await fetch('https://instagr-qnih.onrender.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
          alert('Login Successful!');
          document.getElementById('loginForm').reset();
        } else {
          alert('Login Failed: ' + (result.error || 'Invalid credentials'));
        }
      } catch (err) {
        alert('Error: ' + err.message);
        console.error(err);
      }
    });
  </script>
</body>
</html>
