document.addEventListener('DOMContentLoaded', (event) => {
  const signUpButton = document.getElementById('submit-button');
  signUpButton.addEventListener('click', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!updateRequirementIndicators(password)) {
      alert('Password does not meet the requirements.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // If the form is valid, you might want to proceed with form submission,
    // JSON request.

    alert('Form is valid!');
    // Users can submit the form.
  });
});

function updateRequirementIndicators(password) {
  const requirements = {
    minLength: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  Object.keys(requirements).forEach(key => {
    const requirementMet = requirements[key];
    const element = document.getElementById(key);
    if (requirementMet) {
      element.classList.add('valid-requirement');
    } else {
      element.classList.remove('valid-requirement');
    }
  });
}

// Call this function whenever the password input changes
document.getElementById('password').addEventListener('input', function (e) {
  updateRequirementIndicators(e.target.value);
});