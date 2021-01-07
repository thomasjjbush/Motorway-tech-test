import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Images } from './images';
import { Button } from '../../components/button/button';

const images = [
    {
        alt_description: 'alt description',
        id: '1',
        likes: 500,
        url: '/endpoint',
        user: {
            name: 'Lord Souron',
            profile_image: '/profile_image_souron',
        },
    },
    {
        alt_description: 'another alt description',
        id: '2',
        likes: 500,
        url: '/another-endpoint',
        user: {
            name: 'Samwise the brave',
            profile_image: '/profile_image_sam',
        },
    },
    {
        alt_description: 'yet another alt description',
        id: '3',
        likes: 500,
        url: '/uyet-another-endpoint',
        user: {
            name: 'Rebeus Hagrid',
            profile_image: '/profile_image_hagrid',
        },
    },
];

jest.mock('../../components/button/button', () => ({ Button: (props: any) => props.children }));
jest.mock('../../components/image/image', () => ({ Image: () => 'Image' }));
jest.mock('../../const/const', () => ({ ...jest.requireActual('../../const/const'), noOfImages: 2 }));
jest.mock('../../utils/server/server', () => ({
    server: jest.fn((_, limit, offset) => Promise.resolve(images.slice(offset, offset + limit))),
}));

const flushPromises = async (wrapper: ReactWrapper, extraMethod?: () => void) =>
    act(async () => {
        extraMethod?.();
        await new Promise(setImmediate);
        wrapper.update();
    });

describe('Images', () => {
    it('should match before and after loading images snapshot', async () => {
        const wrapper = mount(<Images columns={2} />);
        expect(wrapper.find({ 'data-test-id': 'grid-item' }).exists()).toBe(false);
        expect(wrapper).toMatchSnapshot();

        await flushPromises(wrapper);
        expect(wrapper.find({ 'data-test-id': 'grid-item' }).length).toBe(4); // twice as many due to mounting of styled components
        expect(wrapper).toMatchSnapshot();
    });

    it('should load more images on load more click', async () => {
        const wrapper = mount(<Images columns={2} />);
        await flushPromises(wrapper);
        expect(wrapper.find({ 'data-test-id': 'grid-item' }).length).toBe(4);

        await flushPromises(wrapper, () => wrapper.find(Button).prop('onClick')());
        expect(wrapper.find({ 'data-test-id': 'grid-item' }).length).toBe(6);
    });
});
