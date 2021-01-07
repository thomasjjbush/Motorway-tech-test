import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { ButtonProps as Props, StyledProps } from '../../../types';

const StyledButton = styled.button<StyledProps>`
    appearance: none;
    background-color: ${({ theme }) => theme.colors.blue};
    border: 0;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 20px;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const Button: FC<Props> = ({ children, disabled = false, onClick, type = 'button' }: Props): ReactElement => (
    <StyledButton disabled={disabled} onClick={onClick} type={type}>
        {children}
    </StyledButton>
);
