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

function openLinkInNewTab(url) {
        window.open(url, '_blank');
    }

function hidePreloader() {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("hidden");

  showPageContent();
}

function showPageContent() {
  // Display the main content smoothly by setting opacity and visibility.
  const content = document.getElementById("container");
  content.style.visibility = "visible";
  content.style.opacity = "1";
}

document.addEventListener('DOMContentLoaded', function () {
    var slides = document.querySelector('.slides');
    var slideLeftBtn = document.getElementById('slide-left-btn');
    var slideRightBtn = document.getElementById('slide-right-btn');
    var navigationDots = document.querySelectorAll('.dot');
    var currentSlide = 0;

    slideLeftBtn.addEventListener('click', function () {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = slides.children.length - 1;
        }
        updateSlide();
    });

    slideRightBtn.addEventListener('click', function () {
        if (currentSlide < slides.children.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlide();
    });

     function updateSlide() {
        var percentage = -currentSlide * 10;
        slides.style.transform = 'translateX(' + percentage + '%)';
        updateNavigationDots();
    }

    function updateNavigationDots() {
        for (var i = 0; i < navigationDots.length; i++) {
            if (i === currentSlide) {
                navigationDots[i].classList.add('active');
            } else {
                navigationDots[i].classList.remove('active');
            }
        }
    }

    function changeSlide(index) {
        currentSlide = index;
        updateSlide();
    }

    // Call updateNavigationDots initially
    updateNavigationDots();

});

// JavaScript for automated slider
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector('.comment-slides');
    currentSlide = index;
    slides.style.transform = `translateX(-${index * 10}%)`;
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.comment-dot');
    dots.forEach((dot, index) => {
        index === currentSlide ? dot.classList.add('active') : dot.classList.remove('active');
    });
}

function changeSlides(index) {
    showSlide(index);
}

// Automatically change slides every 3 seconds (adjust as needed)
setInterval(() => {
    currentSlide = (currentSlide + 1) % 3; // Assuming you have 3 slides
    showSlide(currentSlide);
}, 2000);

document.addEventListener('DOMContentLoaded', function () {
  var isLoggedIn = false; // Replace with actual login check, e.g., localStorage.getItem('loggedIn')

  // Check if the user is logged in
  // Using a flag from localStorage (you'll need to set this flag when the user logs in)
  if(localStorage.getItem('userLoggedIn') === 'true'){
    isLoggedIn = true;
  }

  var logoLink = document.getElementById('logoLink');

  if (isLoggedIn) {
    logoLink.onclick = function () {
      window.location.href = 'home_page.html';
    };
  } else {
    logoLink.onclick = function () {
      window.location.href = 'index.html';
    };
  }
});

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

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".navbar").classList.add("navbar-shrink");
  } else {
    document.querySelector(".navbar").classList.remove("navbar-shrink");
  }
}

document.getElementById('applyButton').addEventListener('click', function() {
    // Check if the user is logged in
    // This is just a placeholder condition; replace it with an actual login check
    var isLoggedIn = false; // Change this to true to simulate a logged-in user

    if (isLoggedIn) {
        window.location.href = 'form.html';
    } else {
        window.location.href = 'sign_up.html';
    }
});




// document.addEventListener('DOMContentLoaded', function () {
//   const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true'; // Example check
//   const dropdownMenu = document.getElementById('dropdownMenu');

//   // Clear existing menu items
//   while (dropdownMenu.firstChild) {
//     dropdownMenu.removeChild(dropdownMenu.firstChild);
//   }

//   // Populate dropdown based on login status
//   if (isLoggedIn) {
//     // If logged in, show profile and settings
//     dropdownMenu.innerHTML = '<li><a href="profile.html">Profile</a></li><li><a href="settings.html">Settings</a></li>';
//   } else {
//     // If not logged in, show login option
//     dropdownMenu.innerHTML = '<li><a href="log-in.html">Log In</a></li>';
//   }

//   // Toggle dropdown display on click
//   document.getElementById('profilePic').addEventListener('click', function() {
//     dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
//   });

//   // Optional: Hide dropdown when clicking elsewhere
//   window.onclick = function(event) {
//     if (!event.target.matches('.profile-pic')) {
//       var dropdowns = document.getElementsByClassName("dropdown-menu");
//       for (var i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.style.display === 'block') {
//           openDropdown.style.display = 'none';
//         }
//       }
//     }
//   };
// });

