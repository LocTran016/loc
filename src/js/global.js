import { isMobile } from 'mobile-device-detect';

function loadFontawesome() {
  if (isMobile) {
    const loadWebFont = document.createElement('link');
    loadWebFont.setAttribute('crossorigin', "anonymous"),
    loadWebFont.setAttribute('rel', 'stylesheet'),
    loadWebFont.setAttribute('href', 'https://use.fontawesome.com/releases/v5.15.1/css/all.css'),
    loadWebFont.setAttribute('integrity', 'sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp'),
    const head = document.getElementsByTagName("head");
    head.appendChild(loadWebFont);
  }
  else {
    const loadSVG = document.createElement("script");
    loadSVG.setAttribute("crossorigin", "anonymous");
    loadSVG.setAttribute("src", 'https://use..com/releases/v5.15.1/js/all.js');
    loadSVG.setAttribute("integrity", "sha384-9/D4ECZvKMVEJ9Bhr3ZnUAF+Ahlagp1cyPC7h5yDlZdXs4DQ/vRftzfd+2uFUuqS");
    loadSVG.defer;
    const head = document.getElementsByTagName("head");
    head.appendChild(loadSVG);
  }
}