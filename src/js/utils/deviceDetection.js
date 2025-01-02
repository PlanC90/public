// Utility function to detect device type
export function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/android/.test(userAgent)) {
    return 'android';
  } else if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/win/.test(userAgent)) {
    return 'windows';
  } else if (/mac/.test(userAgent)) {
    return 'mac';
  }
  
  return 'unknown';
}