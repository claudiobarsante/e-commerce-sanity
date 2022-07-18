import styled, { css, DefaultTheme } from 'styled-components';
import { ButtonProps } from '.';
import media from 'styled-media-query';

const containerModifiers = {
  small: () => css`
    max-width: 20rem;
  `,
  medium: () => css`
    max-width: 20rem;
    ${media.lessThan('medium')`
      width:15rem;  
    `}
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
    transform: scale(1, 1);
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.1, 1.1);
    }

    span {
      display: inline-block;
      padding: 10px 20px;
      font-weight: ${theme.font.bold};
      font-size: ${theme.font.sizes.large};
    }

    ${!!size && containerModifiers[size]()}
    ${isUpperCase && containerModifiers.upperCase()}
    ${hasRadius && containerModifiers.radius()}
    ${isFilled && containerModifiers[backgroundColor!](theme)}
  `}
`;
