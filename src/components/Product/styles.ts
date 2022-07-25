import styled, { css } from 'styled-components';

export const ProductCard = styled.article`
  ${({ theme }) => css`
    background-color: #ebebeb;
    border-radius: 1.5rem;
    color: ${theme.colors.blue};
    cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.1, 1.1);
    }
  `}
`;

export const ProductName = styled.p`
  ${({ theme }) => css`
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.small};
    margin-left: 1rem;
  `}
`;

export const ProductPrice = styled.p`
  ${({ theme }) => css`
    font-weight: ${theme.font.bold};
    color: black;
    font-size: ${theme.font.sizes.small};
    margin-top: 0.6rem;
    margin-left: 1rem;
    padding-bottom: 0.6rem;
  `}
`;
