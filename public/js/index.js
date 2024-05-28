// // Function to check if the user is signed in
// function checkSignInStatus() {
//   const isSignedIn = localStorage.getItem('signedIn');
//   const profilePicture = document.getElementById('profile-picture');
//   const signInButton = document.getElementById('signin-button');

//   if (isSignedIn === 'true') {
//     profilePicture.style.display = 'block';
//     signInButton.style.display = 'none';
//   } else {
//     profilePicture.style.display = 'none';
//     signInButton.style.display = 'block';
//   }
// }

// Run the sign-in status check on page load
window.onload = checkSignInStatus;

function search(event) {
  if (event.key === "Enter") {
    const query = document.getElementById("search-input").value;
    // Redirect to the search results page
    window.location.href = "search-results.html?q=" + encodeURIComponent(query);
  }
}

// Clear search input when clicking outside the search bar
document.addEventListener('click', function(event) {
  const searchInput = document.getElementById('search-input');
  if (event.target !== searchInput) {
    searchInput.value = '';
  }
});