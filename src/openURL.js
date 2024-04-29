export function openURL(url) {
    if (url.startsWith('upi://pay')) {
        window.location.href = url;
    } else if (url.startsWith('https://g.co/kgs')) {
        window.location.href = url;
    } else if (url.startsWith('mailto:')) {
        window.location.href = url;
    } else {
        window.open(url, '_blank');
    }
}
