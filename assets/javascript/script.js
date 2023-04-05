// Fetch a quote from Forismatic API
function fetchInspiration() {
    const url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=callbackFunction";
  
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  
    script.onload = () => document.body.removeChild(script);
  }
  
  // Callback function for the quote response from Forismatic API
  function callbackFunction(data) {
    const quoteElement = document.getElementById('quote');
    quoteElement.textContent = `${data.quoteText} - ${data.quoteAuthor}`;
  
    // Enable or disable the "Save" button based on the presence of the quote
    document.getElementById('save-button').disabled = !data.quoteText;
  }
  
  // Fetch advice from Advice Slip API
  function fetchAdvice() {
    const url = "https://api.adviceslip.com/advice";
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const quoteElement = document.getElementById('quote');
        quoteElement.textContent = data.slip.advice;
  
        // Enable or disable the "Save" button based on the presence of the advice
        document.getElementById('save-button').disabled = !data.slip.advice;
      })
      .catch(error => {
        console.error('Error fetching advice:', error);
      });
  }
  
  // Load saved favorites from localStorage
  function loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }
  
  // Save a new favorite item to localStorage
  function saveFavorite(item) {
    const favorites = loadFavorites();
  
    // Check if the item is already in the favorites
    if (!favorites.some(favorite => favorite.text === item.text)) {
      favorites.push(item);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      displayFavorites();
    }
  }
  
  // Display saved favorites on the page
  function displayFavorites() {
    const favorites = loadFavorites();
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';
  
    for (const favorite of favorites) {
      const listItem = document.createElement('li');
      listItem.textContent = favorite.author ? `${favorite.text} - ${favorite.author}` : favorite.text;
  
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
  
  // Save a favorite when the Save button is clicked
  document.getElementById('save-button').addEventListener('click', () => {
    const quoteText = document.getElementById('quote').textContent;
    const [text, author] = quoteText.split(' - ');
  
    if (!author || author.trim() === '' || author === 'undefined') {
      saveFavorite({ text });
    } else {
      saveFavorite({ text, author });
    }
  });
  
  // Delete a favorite when the Delete button is clicked
  function deleteFavorite(selectedText) {
    const favorites = loadFavorites();
    const updatedFavorites = favorites.filter(favorite => favorite.text !== selectedText);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    displayFavorites();
  }
  
  // Initialize the display of saved favorites
  displayFavorites();
  
  // Event listeners for fetching quotes/advice
  document.getElementById('fetchInspiration').addEventListener('click', fetchInspiration);
  document.getElementById('fetchAdvice').addEventListener('click', fetchAdvice);
  
  // Initialize the Save button as disabled by default
  document.getElementById('save-button').disabled = true;
  