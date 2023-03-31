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