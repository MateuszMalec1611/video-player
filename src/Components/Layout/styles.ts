import styled, { css } from 'styled-components';
import { Box } from '@mui/material';

interface ContentTypes {
    hideStyles: boolean;
}

const hide = css`
    padding: 0;
    margin-top: 0;
`;

export const Content = styled(Box)<ContentTypes>`
    padding: 0 10px;
    margin-top: 70px;

    ${({ hideStyles }) => (hideStyles ? hide : '')};
`;
