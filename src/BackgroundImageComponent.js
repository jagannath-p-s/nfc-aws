import React from 'react';
import styled from 'styled-components';

// Styled component for the background image
const BackgroundImage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.3;
    width: 130vw; /* Use viewport width */
    height: 130vh; /* Use viewport height */
    z-index: -1;
    background-image: url(${props => props.src});
    background-size: 130% 130%; /* Stretch the background image to cover the entire page */
    background-position: center;
   
`;;

// BackgroundImageComponent to render the background image
const BackgroundImageComponent = ({ src }) => (
    <BackgroundImage src={src} />
);

export default BackgroundImageComponent;
