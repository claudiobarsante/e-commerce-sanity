import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1rem;
    margin-top: 2rem;
    padding: 3rem 1rem;
    text-align: center;
    color: ${theme.colors.blue};

    span {
      font-weight: ${theme.font.xbold};
      font-size: ${theme.font.sizes.small};
    }
  `}
`;

export const IconsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    font-size: ${theme.font.sizes.xxlarge};
    gap: 1rem;
  `}
`;
