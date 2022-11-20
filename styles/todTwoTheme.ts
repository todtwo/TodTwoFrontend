import { createTheme} from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#495483",
    },
    secondary: {
      main: "#FFFDF1",
      dark:"#FCF8DA"
    },
    success: {
      main: "#9DD7B5",
    },
    error: {
      main: "#FFAB99",
    },
    warning: {
      main: "#EFDE57",
    },
  },
});

export default theme;
