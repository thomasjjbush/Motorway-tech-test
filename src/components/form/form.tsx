import React, { ChangeEvent, FC, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { FormProps as Props, StyledProps } from '../../../types';
import { Button } from '../button/button';

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input<StyledProps<{ valid: boolean }>>`
    border-radius: 5px;
    height: 30px;
    margin-bottom: 20px;
    padding: 0 10px;

    ${({ theme, valid }): string => `border: solid 2px ${valid ? 'black' : theme.colors.red};`}
`;

const StyledForm = styled.form`
    border: solid 2px black;
    border-radius: 5px;
    margin: 20px auto 0;
    max-width: 1000px;
    padding: 30px;
`;

export const Form: FC<Props> = ({ ariaLabel, fields: initialFields, onSubmit }: Props): ReactElement => {
    const [fields, setFields] = useState(initialFields);

    const onChange = (key: string, e: ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [key]: {
                ...fields[key],
                valid: fields[key].validation?.test(e.currentTarget.value) ?? true,
                value: e.currentTarget.value,
            },
        });
    };

    return (
        <StyledForm aria-label={ariaLabel} data-test-id="form" onSubmit={onSubmit}>
            {Object.entries(fields).map(([key, { label, max, min, type, valid = false, validation, value = '' }]) => (
                <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                        id={key}
                        max={max}
                        min={min}
                        name={label}
                        onChange={(e) => onChange(key, e)}
                        type={type}
                        valid={Boolean(!validation && value) || valid}
                        value={value}
                    />
                </div>
            ))}
            <Button
                disabled={Object.values(fields).some(({ valid, validation }) => validation && !valid)}
                type="submit"
            >
                Submit
            </Button>
        </StyledForm>
    );
};
