import styled, { keyframes } from 'styled-components';

// Define keyframes for cursor movement animation


// Styled components for social media links container, wrapper, and image
export const Sociallinks = styled.div`
  max-width: 400px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 10px;
  justify-content: center;
  margin-bottom: 27px;
`;

export const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: 5px;
  width: calc(25% - 2%);
  height: 68px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative; /* Add relative positioning for hover animation */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: all 0.3s ease; /* Smooth transition for hover animation */
  
  /* Hover animation */
  &:hover {
    transform: translateY(-3px); /* Move wrapper up slightly on hover */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow on hover */
    
  }
  
  /* Click animation */
  &:active {
    transform: translateY(1px); /* Move wrapper down slightly on click */
  }
`;

export const Image = styled.img`
  height: ${(props) => props.height}px;
  width: auto;
  border-radius: 10px;
`;
