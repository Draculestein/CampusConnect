function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  return params;
}

async function fetchUniversities() {
  const queryParams = getQueryParams();
  const response = await fetch('/api/search-filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      program: queryParams.program || '',
      cityType: queryParams.cityType || '',
      climate: queryParams.climate || '',
      isPublic: queryParams.isPublic || '',
      country: queryParams.country || '',
      page: queryParams.page || 1,
    })
  });

  const data = await response.json();
  const count = data.count;
  console.log(count);
  generatePages(count);
}

function generatePages(count) {
  const slidesPerPage = 5;
  const pages = Math.ceil(count / slidesPerPage);
  const containerResult = document.getElementById('container-result');
  const pageLinksContainer = document.getElementById('pageLinksContainer');

  for (let i = 0; i < pages; i++) {
    const pageLink = document.createElement('div');
    pageLink.className = 'page-link';
    pageLink.dataset.target = `page${i + 1}`;
    pageLink.textContent = i + 1;
    pageLinksContainer.appendChild(pageLink);

    const page = document.createElement('div');
    page.className = 'page';
    page.id = `page${i + 1}`;

    const slides = document.createElement('div');
    slides.className = 'slides';

    page.appendChild(slides);
    containerResult.appendChild(page);
  }

  if (pages > 0) {
    document.querySelector('.page-link').classList.add('active');
    document.querySelector('.page').classList.add('active');
    fetchPageContent(1);
  }
}

async function fetchPageContent(pageNumber) {
  const queryParams = getQueryParams();
  const response = await fetch('/api/search-filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      program: queryParams.program || '',
      cityType: queryParams.cityType || '',
      climate: queryParams.climate || '',
      isPublic: queryParams.isPublic || '',
      country: queryParams.country || '',
      page: pageNumber,
    })
  });

  const data = await response.json();
  const slides = data.result;

  const pageElement = document.getElementById(`page${pageNumber}`).querySelector('.slides');
  pageElement.innerHTML = '';

  slides.forEach((slide) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'con-slide';

    const link = document.createElement('a');
    link.href = '/uni/' + slide.url;

    const slideContent = document.createElement('div');
    slideContent.className = 'slide';
    slideContent.style.backgroundImage = `url(${slide.backgroundSearchUrl})`;

    const imgContent = document.createElement('div');
    imgContent.className = 'img-content';

    const imgCenter = document.createElement('img');
    imgCenter.className = 'img-center';
    imgCenter.src = slide.iconUrl;

    imgContent.appendChild(imgCenter);
    slideDiv.appendChild(link);
    link.appendChild(slideContent);
    link.appendChild(imgContent);
    pageElement.appendChild(slideDiv);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchUniversities();

  document.querySelectorAll('.page-link').forEach((anchor, index) => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      document.querySelectorAll('.page-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');

      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });
      targetElement.classList.add('active');

      fetchPageContent(index + 1);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    });
  });

  setTimeout(hidePreloader, 800);
});

function hidePreloader() {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("hidden");

  showPageContent();
}

function toggleNavbar() {
  const navbar = document.getElementById('navbarx');
  navbar.classList.toggle('open');
}

function closeNavbar() {
  const navbar = document.getElementById('navbarx');
  navbar.classList.remove('open');
}

function showPageContent() {
  const content = document.getElementById("container");
  content.style.visibility = "visible";
  content.style.opacity = "1";
}

function toggleDropdown() {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

window.onclick = function(event) {
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

document.querySelector('.home').addEventListener('click', function() {
  goToHomePage();
});

function goToHomePage() {
  var isUserSignedIn = checkUserSignInStatus();
  if (isUserSignedIn) {
    window.location.href = "/home";
  } else {
    window.location.href = "/";
  }
}

function checkUserSignInStatus() {
  return document.cookie.includes("userSignedIn=true");
}

function searchByFilters() {
  const program = document.getElementById("programs").value;
  const cityType = document.getElementById("cities").value;
  const climate = document.getElementById("climate").value;
  const isPublic = document.getElementById("proprietorship").value == "public" ? true : false;
  
  const countrySelect = document.getElementById("countryChoices");
  const country = countrySelect.options[countrySelect.selectedIndex].text;

  const queryParams = {
    program,
    cityType,
    climate,
    isPublic,
    country,
    page: 1
  };
  
  const query = new URLSearchParams(queryParams);
  
  location.href = "/search?" + query.toString();
}