import React from 'react';
import { shallow } from 'enzyme';
import { FormProps as Props } from '../../../types';
import { Form } from './form';
import { Button } from '../button/button';

describe('Form', () => {
    let props: Props;

    beforeEach(() => {
        props = {
            ariaLabel: 'aria label',
            fields: {
                mock: { label: 'mock', validation: /mockValue/ },
                anotherMock: { label: 'Another mock', type: 'number', min: 0, max: 30, value: 5 },
            },
            onSubmit: jest.fn(),
        };
    });

    it('should match snapshot', () => {
        expect(shallow(<Form {...props} />)).toMatchSnapshot();
    });

    it('should update value and not update valid onChange if value does not pass validation', () => {
        const wrapper = shallow(<Form {...props} />);
        expect(wrapper.find({ id: 'mock' }).prop('valid')).toBe(false);

        wrapper.find({ id: 'mock' }).prop('onChange')({ currentTarget: { value: 'mockValu3' } });
        expect(wrapper.find({ id: 'mock' }).prop('value')).toBe('mockValu3');
        expect(wrapper.find({ id: 'mock' }).prop('valid')).toBe(false);
    });

    it('should update value and apply valid prop to input onChange if value passes validation', () => {
        const wrapper = shallow(<Form {...props} />);
        expect(wrapper.find({ id: 'mock' }).prop('valid')).toBe(false);

        wrapper.find({ id: 'mock' }).prop('onChange')({ currentTarget: { value: 'mockValue' } });
        expect(wrapper.find({ id: 'mock' }).prop('value')).toBe('mockValue');
        expect(wrapper.find({ id: 'mock' }).prop('valid')).toBe(true);
    });

    it('should not apply disabled to submit button if all fields are valid and invoke onSubmit cb on click', () => {
        const wrapper = shallow(<Form {...props} fields={{ mock: { label: 'mock', value: 'mockValue' } }} />);
        expect(wrapper.find(Button).prop('disabled')).toBe(false);

        wrapper.find({ 'data-test-id': 'form' }).prop('onSubmit')();
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
    });
});
