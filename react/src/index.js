import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

/**
 * theme is used only to change color of the header bar
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#14213dff'
    }
  },
});

/**
 * Root of the react application Providing app with React features
 */
ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);

/**
 * This was provided by project creation.
 * It appereantly allows to build totally offline react apps?
 */
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
