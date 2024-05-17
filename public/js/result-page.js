document.querySelectorAll('.page-link').forEach((anchor, index) => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    
    // Remove 'active' class from all page links
    document.querySelectorAll('.page-link').forEach(link => {
      link.classList.remove('active');
    });

    // Add 'active' class to the clicked page link
    this.classList.add('active');

    // Store the selected page index in localStorage
    localStorage.setItem('selectedPageIndex', index);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the selected page index from localStorage
  const selectedPageIndex = localStorage.getItem('selectedPageIndex');
  
  // Check if there's a stored index, and set the corresponding page as active
  if (selectedPageIndex !== null) {
    const pages = document.querySelectorAll('.page');
    const pageLinks = document.querySelectorAll('.page-link');
    pages.forEach((page, index) => {
      if (index === parseInt(selectedPageIndex)) {
        page.classList.add('active');
        // Add 'active' class to the corresponding page link
        pageLinks[index].classList.add('active');
      } else {
        page.classList.remove('active');
        // Remove 'active' class from other page links
        pageLinks[index].classList.remove('active');
      }
    });
  }

  setTimeout(hidePreloader, 800);
});

function hidePreloader() {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("hidden");

  showPageContent();
}

// JavaScript to hide/show the navigation bar
function toggleNavbar() {
  const navbar = document.getElementById('navbarx');
  navbar.classList.toggle('open');
}

function closeNavbar() {
  const navbar = document.getElementById('navbarx');
  navbar.classList.remove('open');
}

function showPageContent() {
  // Display the main content smoothly by setting opacity and visibility.
  const content = document.getElementById("container");
  content.style.visibility = "visible";
  content.style.opacity = "1";
}

function toggleDropdown() {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.profile-picture')) {
    const dropdownMenus = document.getElementsByClassName('dropdown-menu');
    for (let i = 0; i < dropdownMenus.length; i++) {
      let openDropdown = dropdownMenus[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
};

function toggleProfileLink() {
  // Simulate a login status check. Replace this with an actual login status check.
  const isLoggedIn = checkLoginStatus(); // Implement this function

  const profileLink = document.getElementById('profileLink');
  const settingLink = document.getElementById('settingLink'); // Assuming setting link is unique
  const logOutLink = document.getElementById('logOutLink'); // Modify this selector based on your log out link's unique identifier

  if (isLoggedIn) {
    profileLink.style.display = 'block'; // Show the Profile link if logged in
    settingLink.style.display = 'block'; // Show the Setting link if logged in
    logOutLink.style.display = 'block'; // Show the Log Out link if logged in
  } else {
    profileLink.style.display = 'none'; // Hide the Profile link if not logged in
    settingLink.style.display = 'none'; // Hide the Setting link if not logged in
    logOutLink.style.display = 'none'; // Hide the Log Out link if not logged in
  }
}

// Implementation of checkLoginStatus()
// This is a placeholder. It needs to implement the actual logic to determine if the user is logged in.
function checkLoginStatus() {
  // Check if 'isLoggedIn' key exists in localStorage and is true
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Call the function on page load and whenever the login status changes.
document.addEventListener('DOMContentLoaded', toggleProfileLink);

// Update the login status and localStorage.
// Part of user login/logout process.
function updateLoginStatus(isLoggedIn) {
  localStorage.setItem('isLoggedIn', isLoggedIn); // Update localStorage
  toggleProfileLink(); // Update the Home link visibility
}

function goToHomePage() {
  // Check if the user is signed in
  // Implement the actual check based on the authentication method
  var isUserSignedIn = checkUserSignInStatus(); // Implement this function

  if (isUserSignedIn) {
    window.location.href = "home_page.html"; // Redirect to main2.html if the user is signed in
  } else {
    window.location.href = "index.html"; // Redirect to index.html if the user is not signed in
  }
}

// Implementation of checkUserSignInStatus (need to replace this with the actual logic)
function checkUserSignInStatus() {
  // Check for a specific cookie, local storage item, or session variable
  // Using a cookie:
  return document.cookie.includes("userSignedIn=true");
}

// Add an event listener to the home element
document.querySelector('.home').addEventListener('click', goToHomePage);