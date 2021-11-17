import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            whiteColor: string;
            blackColor: string;
            lightBlackColor: string;
            grayColor: string;
            redColor: string;
            greenColor: string;
            orangeColor: string;
        };
        fontSizes: {
            XS: string;
            S: string;
            M: string;
            L: string;
            XL: string;
            XXL: string;
            XXXL: string;
            XXXXL: string;
        };
        fontFamily: {
            oswald: string;
            roboto: string;
        }
    }
}
