import { device } from 'src/utils/constants';
import styled from 'styled-components';

export const GameDescriptionTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSizes.S};
    flex-grow: 1;

    @media ${device.tabletBreakpoint} {
        width: 33%;
    }
`;
export const GameShortDescription = styled.h5`
    margin-top: 3px;
    display: none;

    @media ${device.tabletBreakpoint} {
        display: block;
    }
`;
export const GameDescription = styled.div`
    line-height: 24px;
    font-family: ${({ theme }) => theme.fontFamily.roboto};
`;
