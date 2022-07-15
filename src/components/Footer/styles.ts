import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: ${theme.font.xbold};
    font-size: ${theme.font.sizes.small};
    gap: 1rem;
    margin-top: 2rem;
    padding: 3rem 1rem;
    text-align: center;
    color: ${theme.colors.blue};
  `}
`;

export const IconsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    font-size: ${theme.font.sizes.xxlarge};
    gap: 1rem;
  `}
`;
