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

export const anonymousUserDevice = {
    PlatformCode: 'WEB',
    Name: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
};

export const userDevice = {
    PlatformCode: 'WEB',
    Name: '7a6a86e5-356f-4795-8998-305e1b205531',
};

export const ITEMS_PER_PAGE = 15;
