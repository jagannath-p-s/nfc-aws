import React from 'react';
import styled from 'styled-components';
import BackgroundImageComponent from './BackgroundImageComponent';
import ProfileCardComponent from './ProfileCardComponent';
import SocialMediaComponent from './SocialMediaComponent';
import socialMediaUrls from './socialMediaUrls'; // Import socialMediaUrls

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* Add this to make sure BackgroundImageComponent covers the entire container */
`;

function Customerside() {
  return (
    <div>
       <CenteredContainer>
      <BackgroundImageComponent src={socialMediaUrls.backgroundImage} /> {/* Pass the background image URL */}
      <ProfileCardComponent />
      <SocialMediaComponent />
    </CenteredContainer>
    </div>
  )
}

export default Customerside
