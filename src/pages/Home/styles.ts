import { Grid } from '@mui/material';
import styled from 'styled-components';

export const Title = styled.h2`
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.XXXL};
    text-transform: uppercase;
`;
export const AlertBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
export const CardsWrapper = styled(Grid)`
    margin-top: 20px;
`;
