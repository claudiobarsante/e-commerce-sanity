import React from 'react';
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineCopyrightCircle
} from 'react-icons/ai';
// -- Styles
import * as S from './styles';

const index = () => {
  return (
    <S.Container>
      <p>
        <AiOutlineCopyrightCircle aria-label="Copyright circle" />{' '}
        <span>2022 Phanox Headphones All rights reserverd</span>
      </p>
      <S.IconsContainer>
        <AiFillInstagram aria-label="Instagram" />
        <AiOutlineTwitter aria-label="Twitter" />
      </S.IconsContainer>
    </S.Container>
  );
};

export default index;
