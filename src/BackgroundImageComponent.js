import React from 'react';
import styled from 'styled-components';

// Styled component for the background image
const BackgroundImage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.3;
    width: 100vw; /* Use viewport width */
    height: 100vh; /* Use viewport height */
    z-index: -1;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    /* Add overlay */
    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3); /* Black overlay color with opacity */
    }
`;

// BackgroundImageComponent to render the background image
const BackgroundImageComponent = ({ src }) => (
    <BackgroundImage src={src} />
);

export default BackgroundImageComponent;
