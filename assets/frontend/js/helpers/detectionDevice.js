'use strict';

export default function detectionDevice() {
  console.log('detectionDevice');
  let isMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

  return {
    isMobile,
    clickEvent: (isMobile) ? 'touchstart' : 'click'
  };
  
};