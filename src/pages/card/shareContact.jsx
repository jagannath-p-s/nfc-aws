export function shareContact() {
    const currentPageURL = window.location.href;
    const encodedText = encodeURIComponent(currentPageURL);
    const url = "https://api.whatsapp.com/send?text=" + encodedText;
    window.open(url);
}
