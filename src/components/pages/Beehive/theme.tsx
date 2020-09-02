import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        color: '#A9ABCB',
      },
    },
  },
  palette: {
    primary: {
      
      main: '#E2A907',
    },
    secondary:{
      main:'#172333',
    }
  }
});