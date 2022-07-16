import React, {
  forwardRef,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes
} from 'react';
import * as S from './styles';
import { ContainerProps } from './styles';

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  as?: React.ElementType;
  isUpperCase: boolean;
  hasRadius: boolean;
  isFilled: boolean;
  backgroundColor: 'white' | 'red';
  size?: 'small' | 'medium' | 'large';
  icon?: JSX.Element;
} & ButtonTypes;

const Button: React.ForwardRefRenderFunction<ButtonTypes, ButtonProps> = (
  {
    children,
    icon,
    hasRadius = false,
    isFilled = false,
    size = 'medium',
    isUpperCase = false,
    backgroundColor = 'white',
    ...props
  },
  ref
) => {
  return (
    <S.Container
      isUpperCase={isUpperCase}
      size={size}
      hasRadius={hasRadius}
      isFilled={isFilled}
      backgroundColor={backgroundColor}
      ref={ref}
      {...props}
    >
      {!!children && <span>{children}</span>}
    </S.Container>
  );
};

export default forwardRef(Button);
