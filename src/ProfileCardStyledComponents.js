import styled from 'styled-components';

const Main = styled.main`
    position: relative;
    min-height: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 0 0 5px;
`;

const ProfileAvatar = styled.img`
    width: 110px;
    height: 110px;
    border-radius: 50%;
    margin: -50px auto 0;
    border: 1px solid #626262;
    object-fit: cover;
`;

const ProfileCard = styled.div`
    text-align: center;
    width: 100%;
    max-height: 150px;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 0 0 20px 20px;
`;

const ProfileImage = styled.div`
    position: relative;
    text-align: center;
`;

const ContentCard = styled.div`
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;
`;

const ProfileDetails = styled.div`
    margin:  0;
`;

const Username = styled.p`
    font-size: 20px;
    color: #fff;
    text-align: center;
    font-weight: 600;
    margin: 13px 0 10px;
`;

const Designation = styled.p`
    font-size: 20px;
    color: #00bcd4;
    text-align: center;
`;

const ProfileButton = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ConnectButton = styled.button`
    background: rgba(213, 167, 167, 0);
    border-radius: 10px;
    color: #ffffff;
    margin: 5px;
    font-size: 17px;
    font-weight: 400;
    padding: 15px 19px;
    border: .5px solid grey;
    text-transform: capitalize;
`;

export {
    Main,
    ProfileCard,
    ProfileAvatar,
    ProfileImage,
    ContentCard,
    ProfileDetails,
    Username,
    Designation,
    ProfileButton,
    ConnectButton
};
