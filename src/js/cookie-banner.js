/* eslint-disable linebreak-style */
/*
* Javascript to show and hide cookie banner using localstroage
*/

/**
 * Shows the Cookie banner
 */
const showCookieBanner = () => {
  const cookieBanner = document.getElementsByClassName('nk-cookie-banner')[0];
  cookieBanner.style.display = 'block';
};

/**
 * Hides the Cookie banner and saves the value to localstorage
 */
const hideCookieBanner = () => {
  localStorage.setItem('web_dev_isCookieAccepted', 'yes');

  const cookieBanner = document.getElementsByClassName('nk-cookie-banner')[0];
  cookieBanner.style.display = 'none';
};

/**
 * Checks the localstorage and shows Cookie banner based on it.
 */
const initializeCookieBanner = () => {
  const isCookieAccepted = localStorage.getItem('web_dev_isCookieAccepted');
  if (isCookieAccepted === null) {
    localStorage.clear();
    localStorage.setItem('web_dev_isCookieAccepted', 'no');
    showCookieBanner();
  }
  if (isCookieAccepted === 'no') {
    showCookieBanner();
  }
};

// Assigning values to window object
$(document).ready(initializeCookieBanner());
// window.onload = initializeCookieBanner();
window.nk_hideCookieBanner = hideCookieBanner;
