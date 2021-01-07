import React, { FC, FormEvent, ReactElement } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Form } from '../../components/form/form';
import { fields, theme } from '../../const/const';
import { StyledProps } from '../../../types';
import { Images } from '../images/images';

const GlobalStyles = createGlobalStyle<StyledProps>`
    body {
        margin: 20px;

        * {
            box-sizing: border-box;
            font-family: Sans-serif;

            &:focus {
                outline: dashed 2px ${({ theme }) => theme.colors.blue};
                outline-offset: 2px;
            }
        }
    }
`;

const onSubmit = (e: FormEvent) => e.preventDefault();

export const App: FC = (): ReactElement => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Images columns={3} />
            <Form ariaLabel="Form information" fields={fields} onSubmit={onSubmit}></Form>
        </ThemeProvider>
    );
};
