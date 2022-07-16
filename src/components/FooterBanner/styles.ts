import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
background-color: ${theme.colors.primary};
     border-radius: ${theme.border.radius} //15px;
     color: white;
     height: 40rem;
     line-height: 1; 
     margin-top: 12rem;
     padding: 10rem 4rem;
     position: relative;
     width: 100%;

`}
`;

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
