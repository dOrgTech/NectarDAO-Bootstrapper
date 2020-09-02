import { createMuiTheme } from '@material-ui/core/styles';

export const NectarTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 4
      }
    },
  },
  palette: {
    primary: {
      main: '#E2A907',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A9ABCB',
      hint: '#F2994A'
    }
  }
});