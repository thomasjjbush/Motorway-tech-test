import React, { ChangeEvent, FC, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { FormProps as Props, StyledProps } from '../../../types';
import { Button } from '../button/button';

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input<StyledProps<{ valid: boolean }>>`
    background-color: transparent;
    border: solid 2px ${({ theme, valid }): string => (valid ? theme.colors.yellow : theme.colors.red)};
    border-radius: 5px;
    color: white;
    height: 30px;
    margin-bottom: 20px;
    max-width: 300px;
    padding: 0 10px;
    width: 100%;
`;

const StyledForm = styled.form`
    background-color: ${({ theme }) => theme.colors.grey};
    border: solid 2px black;
    color: white;

    & > div {
        margin: auto;
        max-width: 1300px;
        padding: 20px;
    }
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
        <StyledForm aria-label={ariaLabel} autoComplete="off" data-test-id="form" onSubmit={onSubmit}>
            <div>
                {Object.entries(fields).map(
                    ([key, { label, max, min, type, valid = false, validation, value = '' }]) => (
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
                            {type === 'range' && value && <span>£{value}</span>}
                        </div>
                    ),
                )}
                <Button
                    disabled={Object.values(fields).some(
                        ({ valid, validation, value }) => !value || (validation && !valid),
                    )}
                    type="submit"
                >
                    Submit
                </Button>
            </div>
        </StyledForm>
    );
};
