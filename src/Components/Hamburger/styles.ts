import styled, { css } from 'styled-components';

interface burgerProps {
    notActive: boolean;
}

const line = css`
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.whiteColor};
`;
export const HamburgerComponent = styled.div<burgerProps>`
    position: relative;
    width: 30px;
    height: 40px;
    cursor: pointer;
    z-index: 1;

    &::before,
    &::after {
        content: '';
        ${line}
        transition: top 0.3s, transform .3s .3s ease-out;
    }

    &::before {
        top: ${({ notActive }) => (notActive ? '35%' : '50%')};
        transform: ${({ notActive }) => (notActive ? 'rotate(0)' : 'rotate(45deg)')};
    }

    &::after {
        top: ${({ notActive }) => (notActive ? '65%' : '50%')};
        transform: ${({ notActive }) => (notActive ? 'rotate(0)' : 'rotate(-45deg)')};
    }
`;
export const Lines = styled.span<burgerProps>`
    ${line}
    top: 50%;
    transform: ${({ notActive }) => (notActive ? 'translateX(0)' : 'translateX(-100%)')};
    opacity: ${({ notActive }) => (notActive ? 1 : 0)};
    transition: transform 0.3s, opacity 0.1s;
`;
