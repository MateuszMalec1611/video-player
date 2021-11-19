import styled from 'styled-components';

interface LoaderProps {
    margin?: string;
}

export const Box = styled.div<LoaderProps>`
    padding: ${({ margin }) => (margin ? margin : 0)};
    display: flex;
    justify-content: center;
    width: 100%;
`;
