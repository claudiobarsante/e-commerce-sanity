import styled, { css } from 'styled-components';

export const ProductHeading = styled.section`
  ${({ theme }) => css`
    color: ${theme.colors.blue};
    margin: 4rem 0rem;
    text-align: center;

    & h2 {
      font-size: 4rem;
      font-weight: ${theme.font.xbold};
    }

    & p {
      font-size: 1.6rem;
      font-weight: ${theme.font.light};
    }
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
    width: 100%;
  `}
`;
