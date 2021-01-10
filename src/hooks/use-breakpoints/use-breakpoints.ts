import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Theme, UseBreakpointsArgs } from '../../../types';

function getValue(
    desktop: unknown,
    mobile: unknown,
    tablet: unknown,
    tabletLandscape: number,
    tabletPortrait: number,
    e?: { currentTarget: Window },
) {
    const width = e?.currentTarget?.innerWidth || window.innerWidth;

    if (width < tabletPortrait) return mobile;
    if (width < tabletLandscape) return tablet;
    return desktop;
}

export const useBreakpoints = ({ desktop, mobile, tablet }: UseBreakpointsArgs): unknown => {
    const { tabletLandscape: tabletL, tabletPortrait: tabletP } = (useTheme() as Theme).breakpoints;
    const [currentValue, setCurrentValue] = useState(getValue(desktop, mobile, tablet, tabletL, tabletP));

    useEffect(() => {
        const callback = (e) => setCurrentValue(getValue(desktop, mobile, tablet, tabletL, tabletP, e));

        window.addEventListener('resize', callback); // This should be throttled
        return () => window.removeEventListener('resize', callback);
    }, [desktop, mobile, tablet, tabletL, tabletP]);

    return currentValue;
};
