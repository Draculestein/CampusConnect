document.querySelectorAll('.page-link').forEach((anchor, index) => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    
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
    pages.forEach((page, index) => {
      if (index === parseInt(selectedPageIndex)) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
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
