// Needs a list to keep track of all selected options
let slideIndex = 0;
    const slideContainer = document.querySelector('.slide-container');
    const navItems = document.querySelectorAll('.nav-item');

    function goToSlide(index) {
      // Insert all selected option so far into the list

      slideContainer.style.transform = `translateX(-${index * 20}%)`;
      navItems[slideIndex].classList.remove('active');
      navItems[index].classList.add('active');
      slideIndex = index;
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
        otherRowNum = '1'
      
      var otherOption = document.getElementById(colNum + '-' + otherRowNum)
      if (otherOption.classList.contains('selected')) {
          otherOption.classList.remove('selected');
      }

      option.classList.add('selected');
    }

    
const continents = document.querySelectorAll('.continent');

    function handleContinentHover() {
      // You can customize the hover behavior here
      console.log('Hovered over:', this);
    }

    function handleContinentClick() {
      // You can customize the click behavior here
      console.log('Clicked on:', this);

      // Insert area selected into the list

      // Send the list to backend
    }

    // Attach event listeners to each continent
    continents.forEach(continent => {
      continent.addEventListener('mouseenter', handleContinentHover);
      continent.addEventListener('click', handleContinentClick);
    });
