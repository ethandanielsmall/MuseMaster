function fetchInspiration() {
    // Construct the URL for the API request with query parameters
    // The 'jsonp' parameter is set to the name of the callback function (callbackFunction)
    const url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=callbackFunction";

    // Create a new script element
    const script = document.createElement('script');
    // Set the 'src' attribute of the script element to the API URL
    script.src = url;
    // Append the script element to the body of the document to initiate the JSONP request
    document.body.appendChild(script);

    // Once the script element is loaded, remove it from the document to clean up
    script.onload = () => document.body.removeChild(script);
}

// Define the callback function that will be called when the JSONP response is received
function callbackFunction(data) {
    // Find the HTML element with the ID 'quote' and update its text content
    // to display the quote text and author received from the API response (data)
    document.getElementById('quote').textContent = data.quoteText + " - " + data.quoteAuthor;
}

// Find the button element with the ID 'fetchButton' and store it in the variable 'fetchButton'
const fetchInspirationButton = document.getElementById('fetchInspiration');

// Add a click event listener to the 'fetchButton' that calls the 'fetchData' function when the button is clicked
fetchInspirationButton.addEventListener('click', fetchInspiration);

// Define a function to fetch data from the Advice Slip API using fetch (Advice)
function fetchAdvice() {
    // Construct the URL for the Advice Slip API request
    const url = "https://api.adviceslip.com/advice";

    // Make a fetch request to the Advice Slip API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Find the HTML element with the ID 'quote' and update its text content
            // to display the advice received from the API response (data)
            document.getElementById('quote').textContent = data.slip.advice;
        })
        .catch(error => {
            console.error('Error fetching advice:', error);
        });
}

const fetchAdviceButton = document.getElementById('fetchAdvice');
fetchAdviceButton.addEventListener('click', fetchAdvice);

//load saved favorites from localStorage
function loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }
  
  //save a new favorite item to localStorage
  function saveFavorite(item) {
    const favorites = loadFavorites();
    // Check if the item is already in the favorites
    if (!favorites.some(favorite => favorite.text === item.text)) {
      favorites.push(item);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      // Optionally, update the display of saved favorites
      displayFavorites();
    }
  }
  
  //display saved favorites on the page
  function displayFavorites() {
    const favorites = loadFavorites();
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';
    for (const favorite of favorites) {
      const listItem = document.createElement('li');
      listItem.textContent = favorite.text + ' - ' + favorite.author;
  
      // Create the Delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteFavorite(favorite.text);
      });
  
      // Append the Delete button to the list item
      listItem.appendChild(deleteButton);
  
      favoritesList.appendChild(listItem);
    }
  }
  
  // Event listener for the Save button
  document.getElementById('save-button').addEventListener('click', () => {
    const quoteText = document.getElementById('quote').textContent;
    // Extract the text and author from the displayed quote
    const [text, author] = quoteText.split(' - ');
    saveFavorite({ text, author });
  });

  // Event listener for the Delete button
  function deleteFavorite(selectedText) {
    const favorites = loadFavorites();
    // Filter out the selected favorite based on its text
    const updatedFavorites = favorites.filter(favorite => favorite.text !== selectedText);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    // Update the display of saved favorites
    displayFavorites();
  }
  
  // Initialize the display of saved favorites
  displayFavorites();
  