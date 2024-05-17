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

function showPageContent() {
  // Display the main content smoothly by setting opacity and visibility.
  const content = document.getElementById("container");
  content.style.visibility = "visible";
  content.style.opacity = "1";
}

// Needs a list to keep track of all selected options
let slideIndex = 0;
const slideContainer = document.querySelector('.slide-container');
const navItems = document.querySelectorAll('.nav-item');

function goToSlide(index) {
 // Check if the user is moving forward and validate the form
 if (index > slideIndex && !validateForm(getFormIdBySlideIndex(slideIndex))) {
   return; // Prevent moving forward if validation fails
 }

 // Proceed with the slide change
 slideContainer.style.transform = `translateX(-${index * 20}%)`;
 navItems[slideIndex].classList.remove('active');
 navItems[index].classList.add('active');
 slideIndex = index;
}

function getFormIdBySlideIndex(index) {
 switch (index) {
   case 0:
     return 'formPersonalInfo';
   case 1:
     return 'formAccomplishments';
   case 2:
     return 'formFinalization';
   default:
     return ''; // No form associated with the index
 }
}

function previousSlide() {
  if (slideIndex > 0) {
    goToSlide(slideIndex - 1);
  }
}

function selectOption(option) {
  var colNum = option.id.slice(0, 1)
  var rowNum = option.id.slice(-1)

  var otherRowNum = '0'
  if(rowNum == '0')
    otherRowNum = '2'
  
  var otherOption = document.getElementById(colNum + '-' + otherRowNum)
  if (otherOption.classList.contains('selected')) {
      otherOption.classList.remove('selected');
  }

  option.classList.add('selected');
}

let accomplishmentsSlideIndex = 0;
const accomplishmentsSlides = document.querySelectorAll('.accomplishments-slide-page');
// const accomplishmentsNavItems = document.querySelectorAll('.accomplishments-nav-item');

function goToAccomplishmentsSlide(index) {
  accomplishmentsSlides.forEach(slide => {
   slide.style.display = 'none'; // Hide all slides
  });
  accomplishmentsSlides[index].style.display = 'block'; // Show the selected slide
  accomplishmentsSlideIndex = index;
}

function goback(){
  window.history.back();
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input, select, textarea');

  for (const input of inputs) {
    if (input.hasAttribute('required') && !input.value) {
      alert('please fill in all required fields.');
      return false;
    }
  }

  return true;
}

document.getElementById('phoneCountryCode').addEventListener('change', function() {
  var phoneNumberInput = document.getElementById('phoneNumber');
  if (this.value === '+62') {
   phoneNumberInput.placeholder = '813-1993-2377';
  } else {
   phoneNumberInput.placeholder = '123-456-7890'; // Default placeholder for other country codes
  }
});

function validateCountryInput() {
  var input = document.getElementById('countryRegion');
  var list = document.getElementById('countries');
  var options = list.querySelectorAll('option');
  var inputMatch = false;

  for (var i = 0; i < options.length; i++) {
    if (options[i].value.toLowerCase().startsWith(input.value.toLowerCase())) {
      inputMatch = true;
      break;
   }
 }

 if (!inputMatch || /\d/.test(input.value)) {
   input.value = input.value.slice(0, -1); // Remove the last character
  }
}

function validateEmail() {
  var emailInput = document.getElementById('email');
  var email = emailInput.value;
  var allowedDomains = ["@gmail.com", "@icloud.com", "@outlook.com", "@outlook.co.id", "@yahoo.com", "@yahoo.co.id"];
  var isValidDomain = allowedDomains.some(domain => email.endsWith(domain));

  if (!isValidDomain) {
   alert("Please enter an email address with a valid domain (gmail.com, icloud.com, outlook.com, outlook.co.id, yahoo.com, yahoo.co.id).");
   emailInput.value = ''; // Clear the input
   return false;
  }
  return true;
}


function validateAge() {
  var birthdayInput = document.getElementById('birthday');
  var birthday = new Date(birthdayInput.value);
  var today = new Date();
  var age = today.getFullYear() - birthday.getFullYear();
  var m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
   age--;
  }

  if (age < 15 || age > 50) {
   alert("Your age must be above 15 to fill this form.");
   birthdayInput.value = ''; // Clear the input
   return false;
  }
  return true;
}

document.getElementById('phoneNumber').addEventListener('input', function (event) {
  // Allow only digits and hyphens
  this.value = this.value.replace(/[^0-9\-]/g, '');

  // Limit the length of the input to 20 characters
  if (this.value.length > 20) {
   this.value = this.value.slice(0, 20);
  }
});

document.getElementById('emergencyPhoneNumber').addEventListener('input', function (event) {
  // Allow only digits and hyphens
  this.value = this.value.replace(/[^0-9\-]/g, '');

  // Limit the length of the input to 20 characters
  if (this.value.length > 20) {
   this.value = this.value.slice(0, 20);
  }
});

function updateProvinces(country) {
  const provinceInput = document.getElementById('province');
  const provinceList = document.getElementById('provinceList');
  provinceList.innerHTML = ''; // Clear the existing options

  if (country === 'Afghanistan') {
      provinceInput.disabled = false; // Enable the input
      const provinces = ['Badakhshan', 'Badghis', 'Baghlan', 'Balkh', 'Bamyan', 'Daykundi', 'Farah', 'Faryab', 'Ghazni', 'Ghor', 'Helmand', 'Herat', 'Jowzjan', 'Kabul', 'Kandahar', 'Kapisa', 'Khost', 'Kunar', 'Kunduz', 'Laghman', 'Logar', 'Nangarhar', 'Nimroz', 'Nuristan', 'Paktia', 'Paktika', 'Panjshir', 'Parwan', 'Samangan', 'Sar-e Pol', 'Takhar', 'Urozgan (Oruzgan)', 'Wardak', 'Zabul'];
      provinces.forEach(province => {
          const option = document.createElement('option');
          option.value = province;
          provinceList.appendChild(option);
      });
  } else if (country === 'Albania') {
      provinceInput.disabled = false; // Enable the input
      const provinces = ['Berat', 'Dibër', 'Durrës', 'Elbasan', 'Fier', 'Gjirokastër', 'Korçë', 'Kukës', 'Lezhë', 'Shkodër', 'Tiranë (Tirana)', 'Vlorë'];
      provinces.forEach(province => {
          const option = document.createElement('option');
          option.value = province;
          provinceList.appendChild(option);
      });
  } else {
      provinceInput.disabled = true; // Disable the input if no country is selected
  }
}

document.getElementById('countryRegion').addEventListener('input', function() {
  validateCountryInput(); // Keep your existing validation
  updateProvinces(this.value); // Update the provinces based on the selected country
});

document.getElementById('continueButton').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission
  showModal();
});

document.getElementById('doubleCheckButton').addEventListener('click', function() {
  hideModal();
});

document.getElementById('submitButton').addEventListener('click', function() {
  document.getElementById('formFinalization').submit(); // Submit the form
});

function showModal() {
  document.getElementById('confirmationModal').style.display = 'block';
}

function hideModal() {
  document.getElementById('confirmationModal').style.display = 'none';
}

//function submitFormPI(){}

// function submitFormAcc(){}

// function submitFormFinal(){}

