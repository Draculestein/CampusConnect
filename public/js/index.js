// Search function
async function search(event) {
  if (event.key === "Enter") {
    const query = document.getElementById("search-input").value;
    try {
      const response = await fetch('/api/search-name', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          name: query
        })
      });
      if (response.ok) {
        const results = await response.json();
        // Handle the search results (for example, display them in the search-results container)
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = '';
        results.forEach(result => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.textContent = result.name; // Assuming the result has a 'name' property
          item.onclick = () => {
            // Handle the click event for the search result item (e.g., redirect to the university page)
            window.location.href = `/university/${result.id}`; // Assuming the result has an 'id' property
          };
          searchResultsContainer.appendChild(item);
        });
        searchResultsContainer.style.display = 'block';
      } else {
        console.error('Error fetching universities');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
    country,
    page: 1
  };
  
  const query = new URLSearchParams(queryParams);
  
  location.href = "/search?" + query.toString();
}
// Clear search input when clicking outside the search bar
document.addEventListener('click', function(event) {
  const searchInput = document.getElementById('search-input');
  if (event.target !== searchInput && !searchInput.contains(event.target)) {
    searchInput.value = '';
  }
});

// Clear search input when navigating away from the page
window.addEventListener('beforeunload', function() {
  const searchInput = document.getElementById('search-input');
  searchInput.value = '';
});