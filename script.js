/**
 * A best practice is to wait for the HTML document to be fully loaded and parsed
 * before trying to manipulate any of its elements. The 'DOMContentLoaded' event
 * is perfect for this.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Select the HTML elements we want to interact with using their IDs
  const messageElement = document.getElementById('message');
  const changeTextBtn = document.getElementById('changeTextBtn');

  // It's good practice to check if the elements were actually found before
  // adding event listeners to them.
  if (messageElement && changeTextBtn) {
    // Add a 'click' event listener to the button.
    // The code inside this function will run every time the button is clicked.
    changeTextBtn.addEventListener('click', () => {
      // Change the text content of the paragraph element
      messageElement.textContent = 'The text has been updated by JavaScript!';

      // You can also manipulate the style of elements
      messageElement.style.color = '#007bff';
      messageElement.style.fontWeight = 'bold';
    });
  }
});