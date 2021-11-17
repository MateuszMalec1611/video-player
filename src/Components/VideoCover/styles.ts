import { Card, CardMedia } from '@mui/material';
import styled from 'styled-components';

export const GameCard = styled(Card)`
    padding-bottom: 14px;
    margin: 15px;
    box-shadow: 2px 2px 9px black;
    text-align: center;
    cursor: pointer;
`;
export const Image: any = styled(CardMedia)`
    object-position: top;
`;
export const Title = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.L};
    font-family: ${({ theme }) => theme.fontFamily.oswald};
`;
