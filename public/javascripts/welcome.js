let currentSlideIndex = 0;

function goToNextSlide() {
  currentSlideIndex = 1;
  updateSliderPosition();
}

function goToHomePage() {
  window.location.href = 'home_page.html';
}

function updateSliderPosition() {
  const slider = document.getElementById('slider');
  const offset = currentSlideIndex * -100;
  slider.style.transform = `translateX(${offset}%)`;
}

// Handle the form submission
document.getElementById('profilePictureAndUsernameForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Create a FormData object from the form

    // Send the form data to the server-side script (e.g., saveProfile.php)
    fetch('saveProfile.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response from the server
        // Handle the response (e.g., show a success message or redirect)
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const profilePicture = document.getElementById('profilePicture');
    const usernameInput = document.getElementById('username');
    const welcomeButton = document.getElementById('welcomeButton');

    function updateButtonState() {
        // Check if both fields have valid input
        const isProfilePictureSelected = profilePicture.files.length > 0;
        const isUsernameEntered = usernameInput.value.trim() !== '';

        // Enable the button if both conditions are met, otherwise disable it
        welcomeButton.disabled = !(isProfilePictureSelected && isUsernameEntered);
    }

    // Add event listeners to update the button state when the input values change
    profilePicture.addEventListener('change', updateButtonState);
    usernameInput.addEventListener('input', updateButtonState);
});


// Send it to the server using the Fetch API. 
// The server-side Node.js code handles the file upload and saves the data to a JSON file.
// After the profile is saved successfully, the user is redirected to home_page.html.
document.getElementById('profilePictureAndUsernameForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch('/saveProfile', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        window.location.href = 'home_page.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

//Profile Picture Input Function
const profilePicture = document.getElementById('profilePicture');
const profilePicturePreview = document.getElementById('profilePicturePreview');
const profilePictureContainer = document.getElementById('profilePictureContainer');

profilePicture.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePicturePreview.src = e.target.result;
      profilePicturePreview.style.display = 'block';
      profilePictureContainer.textContent = '';
      profilePictureContainer.appendChild(profilePicturePreview);
    };
    reader.readAsDataURL(file);
  }
});