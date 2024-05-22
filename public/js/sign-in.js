document.addEventListener('DOMContentLoaded', function () {

  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) { // Basic check to make sure the fields are not empty
    console.log('Login attempt with:', email, password);
    // Here you would usually send the email and password to the server
    // For demonstration purposes, we will just simulate a login
    simulateLogin(email, password);
  } else {
    alert('Please enter both email and password.');
  }
});

async function simulateLogin(email, password) {
  // This function for checking wheter or not the email and password are already in the database or not.
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

  console.log(response);
}});