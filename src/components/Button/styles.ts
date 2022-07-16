import styled, { css, DefaultTheme } from 'styled-components';
import { ButtonProps } from '.';

const containerModifiers = {
  small: () => css`
    max-width: 20rem;
  `,
  medium: () => css`
    max-width: 20rem;
  `,
  large: () => css`
    max-width: 20rem;
  `,
  filled: () => css`
    border: none;
  `,
  upperCase: () => css`
    text-transform: uppercase;
  `,
  radius: () => css`
    border-radius: 15px;
  `,
  white: (theme: DefaultTheme) => css`
    background-color: white;
    color: ${theme.colors.primary};
  `,
  red: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.primary};
    color: white;
  `
};

export const Container = styled.button<ButtonProps>`
  ${({ theme, size, isFilled, isUpperCase, hasRadius, backgroundColor }) => css`
    border: 1px solid ${theme.colors.primary};
    background-color: white;
    cursor: pointer;
    color: ${theme.colors.primary};
    /* font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.xbold} */
    // padding: 10px 20px;
    transform: scale(1, 1);
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.1, 1.1);
    }

    span {
      display: inline-block;
      padding: 10px 20px;
      font-weight: ${theme.font.xbold};
      font-size: ${theme.font.sizes.large};
    }
    ${!!size && containerModifiers[size]()}
    ${isUpperCase && containerModifiers.upperCase()}
    ${hasRadius && containerModifiers.radius()}
    ${isFilled && containerModifiers[backgroundColor](theme)}
  `}
`;
/**
 * 
 * .buttons .add-to-cart{
  padding: 10px 20px;
  border: 1px solid #f02d34 ;
  margin-top: 40px;
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  color: #f02d34;
  cursor: pointer;
  width: 200px;
   transform: scale(1, 1);
  transition: transform 0.5s ease;
}
.buttons .add-to-cart:hover{
  transform:scale(1.1,1.1)
}
.buttons .buy-now{
  width: 200px;

  padding: 10px 20px;
  background-color: #f02d34;
  color: white;
  border: none;
  margin-top: 40px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
   transform: scale(1, 1);
  transition: transform 0.5s ease;
}
.buttons .buy-now:hover{
  transform:scale(1.1,1.1)
}


-----Media query-----
//'@'media screen and (max-width:800px) {
 .buttons .add-to-cart{
    width: 150px;
  }
  .buttons .buy-now{
    width: 150px;
  }
 */
