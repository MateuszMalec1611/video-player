import styled from 'styled-components';

export const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & form {
        width: 100%;
        max-width: 600px;
        margin-top: 20px;
    }

    & input {
        font-size: ${({ theme }) => theme.fontSizes.M};
    }

    & button {
        font-size: ${({ theme }) => theme.fontSizes.S};
    }
`;
