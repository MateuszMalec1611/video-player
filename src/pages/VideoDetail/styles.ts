import styled from 'styled-components';
import { CardMedia, Paper } from '@mui/material';
import { device } from 'src/utils/constants';

export const GameDetailContainer = styled(Paper)`
    padding: 8px 0 20px 0;
    margin-top: 20px;

    & p {
        color: ${({ theme }) => theme.colors.blackColor};
    }
`;
export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
export const Title = styled.h2`
    margin: 10px 0;
    text-align: center;
    font-family: ${({ theme }) => theme.fontFamily.oswald};
    font-size: ${({ theme }) => theme.fontSizes.XXL};
`;
export const Image: any = styled(CardMedia)`
    object-position: top;
    max-width: 700px;
`;
export const PegiBox = styled.div`
    margin: 20px 0 30px 0;
    width: 90px;
    height: 90px;
`;
export const PegiImage: any = styled(CardMedia)`
    object-position: top;
    object-fit: cover;
`;
export const ButtonsBox = styled.div`
    margin: 20px 0;
    display: flex;
    flex-direction: column;

    & button:first-child {
        margin-bottom: 10px;
    }

    @media ${device.tabletBreakpoint} {
        flex-direction: row;

        & button:first-child {
            margin: 0 10px 0 0;
        }
    }
`;
export const TrailerBox = styled.div`
    padding: 50px;
    width: 100%;
    z-index: 100;

    @media ${device.tabletBreakpoint} {
        padding: 80px;
        max-width: 1200px;
    }

    & div {
        box-shadow: 3px 3px 12px ${({ theme }) => theme.colors.blackColor};
        border-radius: 4px;
    }
`;
export const AlertBox = styled.h4`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 600px;
    z-index: 100;
`;
export const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
