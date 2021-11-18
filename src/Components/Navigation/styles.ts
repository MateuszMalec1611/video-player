import styled from 'styled-components';
import { AppBar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { device } from 'src/utils/constants';

interface navigationProps {
    notActive: boolean;
}

export const NavigationBar = styled(AppBar)`
    padding: 4px 0;
    background-color: ${({ theme }) => theme.colors.lightBlackColor};
    z-index: 100;
`;

export const Title = styled.h1`
    display: flex;
    flex-grow: 1;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.L};
    font-family: ${({ theme }) => theme.fontFamily.oswald};
    cursor: pointer;

    @media ${device.tabletBreakpoint} {
        font-size: ${({ theme }) => theme.fontSizes.XXL};
    }
`;

export const LinksBox = styled.div<navigationProps>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 110vh;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.lightBlackColor};
    transition: transform 0.3s;
    transform: ${({ notActive }) => (notActive ? 'translateX(-200%)' : 'translateX(0)')};

    @media ${device.tabletBreakpoint} {
        position: unset;
        transform: unset;
        height: unset;
        width: unset;
        background-color: unset;
    }
`;

export const LinksWrapper = styled.div`
    margin-bottom: 100px;

    @media ${device.tabletBreakpoint} {
        display: flex;
        margin: unset;
    }
`;

export const Link = styled(NavLink)`
    margin: 5px 0;
    position: relative;
    display: flex;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.grayColor};
    font-size: ${({ theme }) => theme.fontSizes.XXL};
    font-family: ${({ theme }) => theme.fontFamily.oswald};

    &.active {
        color: ${({ theme }) => theme.colors.whiteColor};
    }

    @media ${device.tabletBreakpoint} {
        margin-right: 30px;

        &:last-child {
            margin-right: unset;
        }
    }
`;
