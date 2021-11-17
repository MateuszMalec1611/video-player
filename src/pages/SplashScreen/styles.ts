import styled, { css } from 'styled-components';
import { device } from 'src/utils/constants';
import imgMob from 'src/images/background-mob.jpg';
import imgDesc from 'src/images/background-desc.jpg';

export const coverScreen = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    position: relative;
    height: 100%;
    width: 100%;
`;

export const Title = styled.h1`
    margin-bottom: 20px;
    text-align: center;
    text-transform: uppercase;
    font-size: 32px;
    color: white;
`;

export const Info = styled.p`
    font-size: 20px;
    color: green;
    text-align: center;
`;

export const HeroImage = styled.div`
    ${coverScreen}
    background-image: url(${imgMob});
    background-position: center;
    background-size: cover;
    z-index: -2;

    @media ${device.tabletBreakpoint} {
        background-image: url(${imgDesc});
    }
`;

export const Shadow = styled.div`
    ${coverScreen}
    background-color: rgba(0,0,0,.7);
    z-index: -1;
`;
