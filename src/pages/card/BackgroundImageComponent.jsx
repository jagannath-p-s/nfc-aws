import React from 'react';
import styled from 'styled-components';

// Styled component for the background image
// Styled component for the background image
// Styled component for the background image
const BackgroundImage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    width: 110vw; /* Use viewport width */
    height: 110vh; /* Use viewport height */
    z-index: -1;
    background-image: url(${props => props.src});
    background-size: 100% 100%; /* Stretch the background image to cover the entire page */
    background-position: center;
   
`;;



// BackgroundImageComponent to render the background image
const BackgroundImageComponent = ({ src }) => (
    <BackgroundImage src={src} />
);

export default BackgroundImageComponent;
