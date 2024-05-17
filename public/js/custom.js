function search(event, resultPage) {
  if (event.key === "Enter") {
    const query = document.getElementById("search-input").value;
    // Redirect to the search results page
    window.location.href = resultPage + "?q=" + encodeURIComponent(query);
  }
}





const signinButton = document.getElementById("signin-button");
const overlay = document.getElementById("overlay");
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");
const closeSigninButton = document.getElementById("close-signin");
const closeSignupButton = document.getElementById("close-signup");
const switchToSignupButton = document.getElementById("switch-to-signup");
const switchToSigninButton = document.getElementById("switch-to-signin");

signinButton.addEventListener("click", () => {
  overlay.style.display = "flex";
  signinForm.style.display = "block";
});

closeSigninButton.addEventListener("click", () => {
  overlay.style.display = "none";
  signinForm.style.display = "none";
});

switchToSignupButton.addEventListener("click", () => {
  signinForm.style.display = "none";
  signupForm.style.display = "block";
});

closeSignupButton.addEventListener("click", () => {
  overlay.style.display = "none";
  signupForm.style.display = "none";
});

switchToSigninButton.addEventListener("click", () => {
  signupForm.style.display = "none";
  signinForm.style.display = "block";
});



document.getElementById("signinForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve input values
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Perform validation (dummy validation for example)
  if (username === "admin" && password === "password") {
    alert("Sign in successful");
    overlay.style.display = "none";
    // Perform additional actions (e.g., redirect to another page)
  } else {
    alert("Invalid username or password");
  }
});


