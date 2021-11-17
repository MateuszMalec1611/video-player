import { Card, CardMedia } from '@mui/material';
import styled from 'styled-components';

export const GameCard = styled(Card)`
    padding-bottom: 14px;
    margin: 15px;
    box-shadow: 2px 2px 9px black;
    text-align: center;
`;
export const Image: any = styled(CardMedia)`
    object-position: top;
`;
export const PegiImg: any = styled(CardMedia)`
    object-position: top;
    object-fit: contain;
`;
export const Title = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.L};
    font-family: ${({ theme }) => theme.fontFamily.oswald};
`;
