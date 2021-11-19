import { Card, CardMedia } from '@mui/material';
import styled from 'styled-components';

export const GameCard = styled(Card)`
    margin: 15px;
    text-align: center;
    box-shadow: 2px 2px 9px black;
    transition: transform 0.3s, background-color 0.3s, color 0.3s;
    cursor: pointer;
    border-radius: 12px 12px 0 0;
    height: 90%;

    &:hover {
        transform: scale(1.02);
        background-color: ${({ theme }) => theme.colors.lightBlackColor};
        color: ${({ theme }) => theme.colors.whiteColor};
    }
`;
export const Image: any = styled(CardMedia)`
    object-position: top;
`;
export const Title = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.L};
    font-family: ${({ theme }) => theme.fontFamily.oswald};
`;
