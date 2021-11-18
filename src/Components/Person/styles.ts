import styled from 'styled-components';

export const Box = styled.div`
    margin: 10px;
    padding: 8px 20px;
    display: flex;
    flex-direction: column;
    width: max-content;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.lightBlackColor};
    color: ${({ theme }) => theme.colors.whiteColor};
    border-radius: 5px;
    box-shadow: 4px 3px 10px black;
`;
export const Role = styled.h2`
    font-size: 14px;
`;
export const Name = styled.h3`
    font-size: 12px;
`;
