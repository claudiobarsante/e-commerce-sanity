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
    border: 1px dashed yellow;
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
    
    
    `};
  `}
`;

export const Left = styled.div`
  border: 1px solid black;
  overflow-x: auto;
  width: 100%;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.lessThan('small')`
       grid-area: title;
       //font-weight: 600;
      // font-size: 20px;       
    `}

  h3 {
    font-weight: 900;
    font-size: 80px;
    margin-left: 2.5rem;
    ${customMedia.lessThan('_1080px')`
       font-weight: 600;
       font-size: 60px;       
    `}
    ${media.lessThan('medium')`
       font-weight: 600;
       font-size: 40px;       
    `}
  }
  p {
    margin: 1.8rem;
    font-size: 1.5rem;
  }
`;

export const Right = styled.div`
  border: 1px solid grey;
  line-height: 1.4;
  overflow-x: auto;
  width: 100%;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 30px;

  button {
    margin-top: 2rem;
  }
  ${media.lessThan('small')`
  grid-area:description;
     h3{
      border: 1px solid grey;
      font-weight: 100;
       font-size: 5px;  
     }
            
    `}

  /* h3 {
    font-weight: 800;
    font-size: 60px;
    ${customMedia.lessThan('_1080px')`
       font-weight: 600;
       font-size: 50px;       
    `}

    ${media.lessThan('medium')`
       font-weight: 600;
       font-size: 30px;       
    `}
  } */
  p {
    font-size: 2.5rem;
  }
`;

export const ImageContainer = styled.div`
  border: 1px solid green;
  position: relative;
  width: 100%;
  overflow-x: auto;
  height: 80%;
  height: inherit;
  ${media.lessThan('small')`
  grid-area: image;
  `};

  img {
    object-fit: fill;
    ${media.lessThan('small')`
       object-fit: contain;    
    `}
  }
`;
// export const Image = styled(Img)`
//   // position: absolute;
//   /* top: -35%;
//   left: 8%; */
//   // top: -25%;
//   // left: 25%;
//   //width: 100%;
//   // height: 100%;

//   ${media.lessThan('medium')`
//     width: 77%;
//     left: 30%;
//     top: 6%;
//     height: 56%;
//   `}
// `;
//    @media screen and (max-width:800px) {
//      .hero-banner-container{
//        height: 560px;
//      }
//      .hero-banner-image{
//        width: 77%;
//        height: 62%;
//        top: -2%;
//        right: -6%;
//      }
//      .footer-banner-container{
//        height: 560px;
//        margin-top: 80px;
//      }

//      .banner-desc{
//           display: flex ;
//           justify-content: space-between;
//         }
