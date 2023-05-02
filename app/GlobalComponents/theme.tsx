import { createTheme } from '@mui/material/styles';

export const shades = {
    primary: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000"
    },
    secondary: {
        100: "#f7ccd2",
        200: "#ef99a4",
        300: "#e66677",
        400: "#de3349",
        500: "#d6001c",
        600: "#ab0016",
        700: "#800011",
        800: "#56000b",
        900: "#2b0006"
    },
    neutral: {
        100: "#fff9cc",
        200: "#fff399",
        300: "#ffed66",
        400: "#ffe733",
        500: "#ffe100",
        600: "#ccb400",
        700: "#998700",
        800: "#665a00",
        900: "#332d00"
    }, 
}

export const theme = createTheme({
    palette: {
        primary: {
            main: shades.primary[500]
        },
        secondary: {
            main: shades.secondary[500]
        },
    },
    typography: {
        fontFamily: ["Fauna One", "sans-serif"].join(","),
        fontSize: 11,
        h1: {
            fontFamily: ["Cinzel"].join(","),
            fontSize: 48,
        },
        h2: {
            fontFamily: ["Cinzel"].join(","),
            fontSize: 36,
        },
        h3: {
            fontFamily: ["Cinzel"].join(","),
            fontSize: 25,
        },
        h4: {
            fontFamily: ["Cinzel"].join(","),
            fontSize: 14,
        },
    }
})


