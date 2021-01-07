import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './button';
import { ButtonProps as Props } from '../../../types';

describe('button', () => {
    let props: Props;

    beforeEach(() => {
        props = {
            children: 'hello!',
            onClick: jest.fn(),
        };
    });

    it('should match snapshot', () => {
        expect(shallow(<Button {...props} />)).toMatchSnapshot();
    });

    it('should pass specified type prop correctly', () => {
        expect(shallow(<Button {...props} type="submit" />).prop('type')).toBe('submit');
    });

    it('should pass specified disabled prop correctly', () => {
        expect(shallow(<Button {...props} disabled />).prop('disabled')).toBe(true);
    });

    it('should invoke onClick cb on click', () => {
        shallow(<Button {...props} />).simulate('click');
        expect(props.onClick).toHaveBeenCalledTimes(1);
    });
});
