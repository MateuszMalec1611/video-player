import styled from 'styled-components';
import { AppBar } from '@mui/material';
import { NavLink } from 'react-router-dom';

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
`;

export const LinksBox = styled.div<navigationProps>`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 110vh;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.lightBlackColor};
    transition: transform 0.3s;
    transform: ${({ notActive }) => (notActive ? 'translateX(-200%)' : 'translateX(0)')};
`;

export const LinksWrapper = styled.div`
    margin-bottom: 100px;
`;

export const Link = styled(NavLink)`
    margin: 5px 0;
    position: relative;
    display: flex;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.whiteColor};
    font-size: ${({ theme }) => theme.fontSizes.XXL};

    &.active {
        color: ${({ theme }) => theme.colors.greenColor};
    }
`;
