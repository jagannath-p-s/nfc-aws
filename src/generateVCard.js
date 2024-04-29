import socialMediaUrls from './socialMediaUrls'; // Import socialMediaUrls object

export function generateVCard() {
    const name = socialMediaUrls.name; // Use name from socialMediaUrls
    let phone = socialMediaUrls.phone; // Initialize phone number with default value
    let email = socialMediaUrls.email; // Initialize email with default value

    // Extract phone number from the provided links
    const phoneRegex = /tel:(\+\d+)/;
    Object.values(socialMediaUrls).forEach(link => {
        const match = link.match(phoneRegex);
        if (match && match[1]) {
            phone = match[1];
        }
    });

    // Extract email from the provided links
    const emailRegex = /mailto:([^\?]+)/;
    Object.values(socialMediaUrls).forEach(link => {
        const match = link.match(emailRegex);
        if (match && match[1]) {
            email = match[1];
        }
    });

    // Generate vCard data
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nEMAIL:${email}\nTEL:${phone}\nEND:VCARD`;
    
    // Create and download vCard file
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
