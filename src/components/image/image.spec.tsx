import React from 'react';
import { shallow } from 'enzyme';
import { Image } from './image';
import { ImageProps as Props } from '../../../types';

describe('Image', () => {
    const props: Props = {
        alt: 'alt',
        src: 'path/to/img',
    };

    it('should match snapshot', () => {
        expect(shallow(<Image {...props} />)).toMatchSnapshot();
    });

    it('should add add correct extensons', () => {
        const wrapper = shallow(<Image {...props} />);
        expect(wrapper.find({ 'data-test-id': 'img' }).prop('src')).toBe('path/to/img.jpg');
        expect(wrapper.find('source').prop('srcSet')).toBe('path/to/img.webp');
    });

    it('should add supplied width correctly', () => {
        expect(
            shallow(<Image {...props} width="helloWorld" />)
                .find({ 'data-test-id': 'img' })
                .prop('width'),
        ).toBe('helloWorld');
    });

    it('should apply border radius if round prop is provided and is true', () => {
        expect(shallow(<Image {...props} round />)).toMatchSnapshot();
    });
});
