import styled, { css } from 'styled-components';
import media, { generateMedia } from 'styled-media-query';

const customMedia = generateMedia({
  _1080px: '1080px',
  tablet: '60em',
  mobile: '46em'
});

export const Container = styled.section`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 30% 40% 30%;

    justify-items: center;
    align-items: center;

    background-color: ${theme.colors.primary};
    border-radius: ${theme.border.radius}; //15px;

    color: white;

    height: 40rem;
    width: 100%;

    line-height: 1;
    margin-top: 12rem;

    position: relative;

    ${media.lessThan('small')`
    grid-template-columns: 50% 50%;
    grid-template-rows:50% 50%;
    grid-template-areas: 'title image' 'description description';  
    height:inherit;
    `};
  `}
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  overflow-x: auto;

  ${media.lessThan('small')`
       grid-area: title;          
  `}

  ${({ theme }) => css`
    h3 {
      font-weight: ${theme.font.xbold};
      font-size: 8rem;
      margin-left: 2.5rem;

      ${customMedia.lessThan('_1080px')`
       font-weight: ${theme.font.bold};
       font-size: 6rem;       
    `}
      ${media.lessThan('medium')`
       font-weight: ${theme.font.bold};
       font-size: 4rem;       
    `}
    }
    p {
      margin: 1.8rem;
      font-size: 1.5rem;
    }
  `}
`;

export const ImageContainer = styled.div`
  overflow-x: auto;
  position: relative;

  height: 100%;
  width: 100%;

  ${media.lessThan('small')`
     grid-area: image;
  `};

  img {
    object-fit: fill;
    ${media.lessThan('small')`
       object-fit: contain;    
    `}
    ${media.lessThan('medium')`
      object-fit: scale-down;
    `}
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  // line-height: 1.4;
  overflow-x: auto;

  ${({ theme }) => css`
    h3 {
      font-size: 6rem;
      font-weight: ${theme.font.bold};
      text-align: center;
      line-height: 1.4;
    }

    ${media.lessThan('small')`
     grid-area:description;                
   `}

    ${media.lessThan('medium')`
      h3{    
       font-size: 3rem; 
      }             
    `}
    ${customMedia.lessThan('_1080px')`      
      h3{    
       font-size: 5rem; 
         }        
    `}
  `}

  button {
    margin-top: 3rem;
  }

  p {
    font-size: 2.5rem;
    text-align: center;
  }
`;
