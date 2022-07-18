import styled, { css } from 'styled-components';
import media, { generateMedia } from 'styled-media-query';

const customMedia = generateMedia({
  _1080px: '1080px',
  tablet: '60em',
  mobile: '46em'
});

export const Container = styled.section`
  ${({ theme }) => css`
    border: 1px dashed yellow;
    display: grid;
    grid-template-columns: 30% 40% 30%;
    justify-content: center;
    align-content: center;
    background-color: ${theme.colors.primary};
    border-radius: ${theme.border.radius}; //15px;
    color: white;
    height: 40rem;
    line-height: 1;
    margin-top: 12rem;
    // gap: ${theme.grid.gutter};
    padding: 4rem 4rem;
    position: relative;
    width: 100%;

    /* ${media.lessThan('medium')`
     height: 560px;
     margin-top: 80px; 
    `} */
  `}
`;

export const Left = styled.div`
  border: 1px solid black;
  overflow-x: auto;
  width: 100%;
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
    ${media.lessThan('small')`
       font-weight: 600;
       font-size: 20px;       
    `}
  }
  p {
    margin: 1.8rem;
  }
`;

export const Right = styled.div`
  border: 1px solid grey;
  line-height: 1.4;
  overflow-x: auto;
  width: 100%;

  ${media.lessThan('small')`
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
