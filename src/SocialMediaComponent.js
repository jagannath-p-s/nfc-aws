import React from 'react';
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

const openURL = async (url, linkType, socialMediaDataId) => {
  try {
    // Insert the click data into the link_clicks table
    const { data, error } = await supabase
      .from('link_clicks')
      .insert([
        {
          social_media_data_id: socialMediaDataId,
          link_type: linkType,
          link_value: url,
        },
      ]);

    if (error) {
      console.error('Error saving link click:', error);
    } else {
      console.log('Link click saved successfully');
    }

    // Open the URL
    window.open(url, '_blank');
  } catch (error) {
    console.error('Error saving link click:', error);
    // Handle the error if needed
  }
};

const SocialMediaComponent = () => {
  // Get the ID from the URL
  const urlParts = window.location.href.split('/');
  const socialMediaDataId = urlParts[urlParts.length - 1];

  return (
    <Sociallinks>
      {/* First row */}
      {socialMediaUrls.phone && (
        <Wrapper onClick={() => openURL(socialMediaUrls.phone, 'phone', socialMediaDataId)}>
          <Image src={callIcon} alt="Phone" height={40} />
        </Wrapper>
      )}
      {socialMediaUrls.whatsapp && (
        <Wrapper onClick={() => openURL(socialMediaUrls.whatsapp, 'whatsapp', socialMediaDataId)}>
          <Image src={whatsappIcon} alt="WhatsApp" height={54} />
        </Wrapper>
      )}
      {socialMediaUrls.website && (
        <Wrapper onClick={() => openURL(socialMediaUrls.website, 'website', socialMediaDataId)}>
          <Image src={browseIcon} alt="Website" height={56} />
        </Wrapper>
      )}
      {/* Second row */}
      {socialMediaUrls.facebook && (
        <Wrapper onClick={() => openURL(socialMediaUrls.facebook, 'facebook', socialMediaDataId)}>
          <Image src={facebookIcon} alt="Facebook" height={48} />
        </Wrapper>
      )}
      {socialMediaUrls.instagram && (
        <Wrapper onClick={() => openURL(socialMediaUrls.instagram, 'instagram', socialMediaDataId)}>
          <Image src={instagramIcon} alt="Instagram" height={65} />
        </Wrapper>
      )}
      {socialMediaUrls.youtube && (
        <Wrapper onClick={() => openURL(socialMediaUrls.youtube, 'youtube', socialMediaDataId)}>
          <Image src={youtubeIcon} alt="Youtube" height={48} />
        </Wrapper>
      )}
      {/* Third row */}
      {socialMediaUrls.linkedin && (
        <Wrapper onClick={() => openURL(socialMediaUrls.linkedin, 'linkedin', socialMediaDataId)}>
          <Image src={linkedinIcon} alt="LinkedIn" height={48} />
        </Wrapper>
      )}
      {socialMediaUrls.googleReviews && (
        <Wrapper onClick={() => openURL(socialMediaUrls.googleReviews, 'googleReviews', socialMediaDataId)}>
          <Image src={reviewIcon} alt="Google Reviews" height={65} />
        </Wrapper>
      )}
      {socialMediaUrls.paytm && (
        <Wrapper onClick={() => openURL(socialMediaUrls.paytm, 'paytm', socialMediaDataId)}>
          <Image src={paytmIcon} alt="Paytm" height={65} />
        </Wrapper>
      )}
      {/* Fourth row */}
      {socialMediaUrls.email && (
        <Wrapper onClick={() => openURL(socialMediaUrls.email, 'email', socialMediaDataId)}>
          <Image src={Mail} alt="Mail" height={75} />
        </Wrapper>
      )}
      {socialMediaUrls.maps && (
        <Wrapper onClick={() => openURL(socialMediaUrls.maps, 'maps', socialMediaDataId)}>
          <Image src={Mapicon} alt="Maps" height={50} />
        </Wrapper>
      )}
      {socialMediaUrls.maps && (
        <Wrapper onClick={() => openURL(socialMediaUrls.maps, 'gallery', socialMediaDataId)}>
          <Image src={Gallery} alt="Maps" height={60} />
        </Wrapper>
      )}
    </Sociallinks>
  );
};

export default SocialMediaComponent;