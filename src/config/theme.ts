import { createTheme } from '@mui/material';
import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    colors: {
        whiteColor: '#fff',
        blackColor: '#000000',
        lightBlackColor: '#3e3e3e',
        grayColor: 'gray',
        redColor: '#fd6246',
        greenColor: '#4bc33e',
        orangeColor: '#efa51e',
    },
    fontSizes: {
        XS: '16px',
        S: '18px',
        M: '20px',
        L: '22px',
        XL: '24px',
        XXL: '30px',
        XXXL: '35px',
        XXXXL: '60px',
    },
    fontFamily: {
        oswald: "'Oswald', sans-serif",
        roboto: "'Roboto', sans-serif",
    },
};

export const materialTheme = createTheme({
    palette: {
        primary: {
            main: '#3e3e3e',
        },
    },
});
