import React, { ReactElement } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { useBreakpoints } from './use-breakpoints';

interface Events {
    [key: string]: EventListenerOrEventListenerObject;
}

jest.mock('styled-components', () => ({
    useTheme: jest.fn().mockReturnValue({ breakpoints: { tabletLandscape: 1024, tabletPortrait: 768 } }),
}));

function MockComponent(): ReactElement {
    const res = useBreakpoints({ desktop: 'DESKTOP!', mobile: 'MOBILE!', tablet: 'TABLET!' });
    return <p>{res}</p>;
}

describe('useBreakpoints', () => {
    const events: Events = {};

    beforeEach(() => {
        window.addEventListener = jest.fn((event, cb) => (events[event] = cb));
    });

    it.each`
        expected      | innerWidth
        ${'DESKTOP!'} | ${1400}
        ${'TABLET!'}  | ${1000}
        ${'MOBILE!'}  | ${300}
    `('should return $expected for innerWidth of $innerWidth', ({ expected, innerWidth }) => {
        global.innerWidth = innerWidth;
        const wrapper = mount(<MockComponent />);
        expect(wrapper.text()).toBe(expected);
    });

    it('should invoke callback on window resize', () => {
        global.innerWidth = 100;
        const wrapper = mount(<MockComponent />);
        expect(wrapper.text()).toBe('MOBILE!');

        act(() => {
            (events as any).resize({ currentTarget: { innerWidth: 1300 } });
        });
        wrapper.update();
        expect(wrapper.text()).toBe('DESKTOP!');
    });
});
