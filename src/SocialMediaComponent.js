import { createClient } from '@supabase/supabase-js';
import socialMediaUrls from './socialMediaUrls';
import { Sociallinks, Wrapper, Image } from './SocialMediaStyledComponents';
import callIcon from './images/call.png';
import whatsappIcon from './images/whatsapp.png';
import browseIcon from './images/browse.png';
import facebookIcon from './images/fb.png';
import instagramIcon from './images/insta.png';
import youtubeIcon from './images/youtube.png';
import linkedinIcon from './images/linkedin.png';
import reviewIcon from './images/rev.png';
import paytmIcon from './images/pay.png';
import Mail from './images/mail.png';
import Gallery from './images/gallery.png';
import Mapicon from './images/mapicon.svg';
import supabase from './supabase';
import { openURL } from './openURL';



const SocialMediaComponent = () => {
  // Get the ID from the URL
  const urlParts = window.location.href.split('/');
  const socialMediaDataId = urlParts[urlParts.length - 1];

  return (
    <Sociallinks>
      {/* First row */}
      {socialMediaUrls.phone && (
        <Wrapper>
          <a href={`tel:${socialMediaUrls.phone}`} onClick={() => openURL(socialMediaUrls.phone, 'phone', socialMediaDataId)}>
            <Image src={callIcon} alt="Phone" height={40} />
          </a>
        </Wrapper>
      )}
      {socialMediaUrls.whatsapp && (
        <Wrapper>
          <a href={`https://wa.me/${socialMediaUrls.whatsapp}`} onClick={() => openURL(socialMediaUrls.whatsapp, 'whatsapp', socialMediaDataId)}>
            <Image src={whatsappIcon} alt="WhatsApp" height={54} />
          </a>
        </Wrapper>
      )}
      {socialMediaUrls.website && (
        <Wrapper>
          <a href={socialMediaUrls.website} target="_blank" rel="noopener noreferrer" onClick={() => openURL(socialMediaUrls.website, 'website', socialMediaDataId)}>
            <Image src={browseIcon} alt="Website" height={56} />
          </a>
        </Wrapper>
      )}
      {/* Second row */}
      {socialMediaUrls.facebook && (
        <Wrapper>
          <a href={socialMediaUrls.facebook} target="_blank" rel="noopener noreferrer" onClick={() => openURL(socialMediaUrls.facebook, 'facebook', socialMediaDataId)}>
            <Image src={facebookIcon} alt="Facebook" height={48} />
          </a>
        </Wrapper>
      )}
      {socialMediaUrls.instagram && (
        <Wrapper>
          <a href={socialMediaUrls.instagram} target="_blank" rel="noopener noreferrer" onClick={() => openURL(socialMediaUrls.instagram, 'instagram', socialMediaDataId)}>
            <Image src={instagramIcon} alt="Instagram" height={65} />
          </a>
        </Wrapper>
      )}
      {socialMediaUrls.youtube && (
        <Wrapper>
          <a href={socialMediaUrls.youtube} target="_blank" rel="noopener noreferrer" onClick={() => openURL(socialMediaUrls.youtube, 'youtube', socialMediaDataId)}>
            <Image src={youtubeIcon} alt="Youtube" height={48} />
          </a>
        </Wrapper>
      )}
      {/* Third row */}
      {socialMediaUrls.linkedin && (
        <Wrapper>
          <a href={socialMediaUrls.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => openURL(socialMediaUrls.linkedin, 'linkedin', socialMediaDataId)}>
            <Image src={linkedinIcon} alt="LinkedIn" height={48} />
          </a>
        </Wrapper>
      )}
      {socialMediaUrls.googleReviews && (
        <Wrapper>
          <a href={socialMediaUrls.googleReviews} target="_blank" rel="noopener noreferrer" onClick={() => openURL(socialMediaUrls.googleReviews, 'googleReviews', socialMediaDataId)}>
            <Image src={reviewIcon} alt="Google Reviews" height={65} />
          </a>
        </Wrapper>
      )}
      {socialMediaUrls.paytm && (
        <Wrapper>
          <a href={socialMediaUrls.paytm} target="_blank" rel="noopener noreferrer" onClick={() => openURL(socialMediaUrls.paytm, 'paytm', socialMediaDataId)}>
            <Image src={paytmIcon} alt="Paytm" height={65} />
          </a>
        </Wrapper>
      )}
      {/* Fourth row */}
      {socialMediaUrls.email && (
        <Wrapper>
          <a href={`mailto:${socialMediaUrls.email}`} onClick={() => openURL(socialMediaUrls.email, 'email', socialMediaDataId)}>
            <Image src={Mail} alt="Mail" height={75} />
          </a>
        </Wrapper>
      )}
      {socialMediaUrls.maps && (
        <Wrapper>
          <a href={socialMediaUrls.maps} target="_blank" rel="noopener noreferrer" onClick={() => openURL(socialMediaUrls.maps, 'maps', socialMediaDataId)}>
            <Image src={Mapicon} alt="Maps" height={50} />
          </a>
        </Wrapper>
      )}
      {socialMediaUrls.maps && (
        <Wrapper>
          <a href={socialMediaUrls.drive} target="_blank" rel="noopener noreferrer" onClick={() => openURL(socialMediaUrls.drive, 'gallery', socialMediaDataId)}>
            <Image src={Gallery} alt="Gallery" height={60} />
          </a>
        </Wrapper>
      )}
    </Sociallinks>
  );
};

export default SocialMediaComponent;