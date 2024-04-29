import React from 'react';
import { Main, ProfileCard, ProfileAvatar, ProfileImage, ContentCard, ProfileDetails, Username, Designation, ProfileButton, ConnectButton } from './ProfileCardStyledComponents';
import { generateVCard } from './generateVCard';
import { shareContact } from './shareContact';
import socialMediaUrls from './socialMediaUrls'; // Import socialMediaUrls object

const ProfileCardComponent = () => (
    <Main>
        <ProfileCard>
            <img src={socialMediaUrls.cardbackgroundImage} alt="Background" /> {/* Use background image URL */}
        </ProfileCard>
        <ContentCard>
            <ProfileImage>
                <ProfileAvatar src={socialMediaUrls.avatar} alt="Avatar" /> {/* Use avatar image URL */}
            </ProfileImage>
            <ProfileDetails>
                <Username>{socialMediaUrls.name}</Username> {/* Use name from socialMediaUrls */}
                <Designation><span>{socialMediaUrls.designation}</span></Designation> {/* Use designation from socialMediaUrls */}
            </ProfileDetails>
            <ProfileButton id="profile-button">
                <ConnectButton onClick={generateVCard}>Save Contact</ConnectButton>
                <ConnectButton onClick={shareContact}>Share Contact</ConnectButton>
            </ProfileButton>
        </ContentCard>
    </Main>
);

export default ProfileCardComponent;