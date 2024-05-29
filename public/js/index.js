function search(event) {
  if (event.key === "Enter") {
    const query = document.getElementById("search-input").value;
    // Redirect to the search results page
    window.location.href = "/search?q=" + encodeURIComponent(query);
  }
}

function searchByFilters() {
  const program = document.getElementById("programs").value;
  const cities = document.getElementById("cities").value;
  const climate = document.getElementById("climate").value;
  const proprietorship = document.getElementById("proprietorship").value;
  
  const countrySelect = document.getElementById("countryChoices");
  const country = countrySelect.options[countrySelect.selectedIndex].text;


  
}

// Clear search input when clicking outside the search bar
document.addEventListener('click', function(event) {
  const searchInput = document.getElementById('search-input');
  if (event.target !== searchInput) {
    searchInput.value = '';
  }
});