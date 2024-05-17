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
