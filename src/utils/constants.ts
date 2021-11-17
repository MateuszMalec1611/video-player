const size = {
    mobileBreakpoint: '600px',
    tabletBreakpoint: '900px',
    desktopBreakpoint: '1200px',
    largeDesktopBreakpoint: '1536px',
};

export const device = {
    mobileBreakpoint: `(min-width: ${size.mobileBreakpoint})`,
    tabletBreakpoint: `(min-width: ${size.tabletBreakpoint})`,
    desktopBreakpoint: `(min-width: ${size.desktopBreakpoint})`,
    largeDesktopBreakpoint: `(min-width: ${size.largeDesktopBreakpoint})`,
};
