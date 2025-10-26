/**
 * This script handles the click/tap functionality for the navigation dropdown menu,
 * making it accessible on touch devices while preserving hover on desktop.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Find the dropdown container and its trigger button.
  // --- Main Navigation Dropdown Logic (Videos, Games) ---
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropbtn');
    if (trigger) {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        dropdown.classList.toggle('is-active');
      });
    }
  });

  // --- Settings Dropdown Logic ---
  const settingsDropdown = document.querySelector('.settings-dropdown');
  if (settingsDropdown) {
    const settingsBtn = settingsDropdown.querySelector('.settings-btn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        settingsDropdown.classList.toggle('is-active');
      });
    }
  }

  // --- Global Click Listener to Close All Dropdowns ---
  document.addEventListener('click', (event) => {
    // If the click was not inside any dropdown, close all of them.
    if (!event.target.closest('.dropdown, .settings-dropdown')) {
      document.querySelectorAll('.dropdown, .settings-dropdown').forEach(d => {
        d.classList.remove('is-active');
      });
    }
  });

  // --- Theme Switcher ---
  const themeOptions = document.querySelectorAll('.settings-dropdown-content a');
  const body = document.body;

  /**
   * Applies a theme to the site by setting a data-attribute on the body
   * and saving the choice to localStorage.
   * @param {string} theme - The name of the theme to apply.
   */
  const applyTheme = (theme) => {
    body.dataset.theme = theme;
    localStorage.setItem('selectedTheme', theme);
  };

  // Add click listeners to all theme options.
  themeOptions.forEach(option => {
    option.addEventListener('click', (event) => {
      event.preventDefault();
      const selectedTheme = event.currentTarget.dataset.theme;
      applyTheme(selectedTheme);
    });
  });

  // On initial page load, apply the saved theme or the default.
  const savedTheme = localStorage.getItem('selectedTheme');
  applyTheme(savedTheme || 'space');

  // --- Random Video Player on Homepage ---
  const randomVideoContainer = document.getElementById('random-video-container');

  /**
   * Extracts the YouTube video ID from various URL formats.
   * @param {string} url - The YouTube URL.
   * @returns {string|null} The video ID or null if not found.
   */
  const extractYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Only run this logic if we are on a page with the video container.
  if (randomVideoContainer) {
    const videoListString = localStorage.getItem('randomVideoList');

    if (videoListString) {
      // Get all non-empty lines from the saved list.
      const allLinks = videoListString.split('\n').filter(link => link.trim() !== '');
      // Take only the top 7 links.
      const top7Links = allLinks.slice(0, 7);

      if (top7Links.length > 0) {
        // Select a random link from the top 7.
        const randomLink = top7Links[Math.floor(Math.random() * top7Links.length)];
        const videoId = extractYouTubeID(randomLink);

        if (videoId) {
          // Check if the link is a YouTube Short to apply vertical styling.
          if (randomLink.includes('/shorts/')) {
            randomVideoContainer.classList.add('is-short');
          }

          // Create the iframe for the video embed.
          const iframe = document.createElement('iframe');
          // Use parameters to autoplay, mute, loop, and hide controls for a clean look.
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`;
          iframe.frameBorder = '0';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
          
          // Add the iframe to the container.
          randomVideoContainer.appendChild(iframe);
        }
      }
    }
  }
});