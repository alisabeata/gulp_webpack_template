'use strict';

export default function loadingPage (APP_DEVICE) {
  console.log(APP_DEVICE.isMobile);
  console.log('loadingPage');
  
  let htmlElem = document.documentElement;
  let pageLoaded = () => {
    
    APP_DEVICE.isMobile ? htmlElem.classList.add('js-mobile') : htmlElem.classList.add('js-desktop');
    
    htmlElem.classList.remove('no-js');
    htmlElem.classList.add('page-loaded');
  };
  
  document.addEventListener('DOMContentLoaded', pageLoaded);
};