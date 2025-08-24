/**
 * This script handles the click/tap functionality for the navigation dropdown menu,
 * making it accessible on touch devices while preserving hover on desktop.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Find the dropdown container and its trigger button.
  const dropdown = document.querySelector('.dropdown');
  const dropbtn = document.querySelector('.dropbtn');

  if (dropdown && dropbtn) {
    dropbtn.addEventListener('click', (event) => {
      // Prevent the link from trying to navigate to "#".
      event.preventDefault();
      // Toggle an 'is-active' class on the dropdown container.
      dropdown.classList.toggle('is-active');
    });

    // Add a global click listener to close the dropdown when clicking elsewhere.
    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('is-active');
      }
    });
  }
});