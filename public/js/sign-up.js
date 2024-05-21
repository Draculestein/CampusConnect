document.addEventListener('DOMContentLoaded', (event) => {
  const signUpButton = document.getElementById('submit-button');
  const passwordField = document.getElementById('password');

  passwordField.addEventListener('input', function () {
    updateRequirementIndicators(passwordField.value);
  });

  signUpButton.addEventListener('click', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!updateRequirementIndicators(password)) {
      alert('Password does not meet the requirements.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    alert('Form is valid!');

    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  });

  function updateRequirementIndicators(password) {
    const requirements = [
      { regex: /.{12,}/, elementId: 'minLength' },
      { regex: /[A-Z]/, elementId: 'uppercase' },
      { regex: /[a-z]/, elementId: 'lowercase' },
      { regex: /[0-9]/, elementId: 'number' },
      { regex: /[^A-Za-z0-9]/, elementId: 'symbol' }
    ];

    let allValid = true;

    for (let requirement of requirements) {
      const element = document.getElementById(requirement.elementId);
      if (requirement.regex.test(password)) {
        element.classList.add('valid-requirement');
      } else {
        element.classList.remove('valid-requirement');
        allValid = false;
      }
    }

    return allValid;
  }
});