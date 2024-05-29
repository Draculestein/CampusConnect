function search(event) {
  if (event.key === "Enter") {
    const query = document.getElementById("search-input").value;
    // Redirect to the search results page
    window.location.href = "/search?name=" + encodeURIComponent(query);
  }
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
    country
  };
  
  const query = new URLSearchParams(queryParams);
  
  location.href = "/search?" + query.toString();
}

// Clear search input when clicking outside the search bar
document.addEventListener('click', function(event) {
  const searchInput = document.getElementById('search-input');
  if (event.target !== searchInput) {
    searchInput.value = '';
  }
});