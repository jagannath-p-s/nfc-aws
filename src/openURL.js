export function openURL(url) {
  if (url.startsWith('mailto:') || url.startsWith('tel:')) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank'; // Ensures opening in a new tab or app
    anchor.rel = 'noopener noreferrer'; // Security precaution
    anchor.click(); // Programmatically triggers the click
  } else if (url.startsWith('upi://')) {
    window.location.href = url; // Opens UPI links
  } else {
    window.open(url, '_blank'); // Opens other URLs in a new tab
  }
}
