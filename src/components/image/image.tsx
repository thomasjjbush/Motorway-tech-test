import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { ImageProps as Props } from '../../../types';

const Img = styled.img<{ round: boolean }>`
    display: block;
    ${({ round }) => round && 'border-radius: 50%;'}
`;

export const Image: FC<Props> = ({ alt, round, src, width }: Props): ReactElement => {
    return (
        <picture>
            <source srcSet={`${src}.webp`} type="image/webp" />
            <Img alt={alt} data-test-id="img" round={round} src={`${src}.jpg`} width={width ?? '100%'} />
        </picture>
    );
};
