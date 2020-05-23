import React from 'react';
import HeaderBar from './components/HeaderBar';
import Grid from "@material-ui/core/Grid";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './App.css';

function getDirection(mediaQuery: boolean) {
  if(mediaQuery) return "row"// larger than sm
  else return "column" // smaller than sm
}
function getXs1(mediaQuery: boolean) {
  if(mediaQuery) return 3 // larger than sm
  else  return "auto" // smaller than sm
}
function getXs2(mediaQuery: boolean) {
  if(mediaQuery) return 9 // larger than sm
  else  return "auto" // smaller than sm
}


function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className="App">
      <HeaderBar></HeaderBar>

      <Grid className="fill" container direction={getDirection(matches)}>
        <Grid className="panel1" item xs={getXs1(matches)}>
          List of notes
        </Grid>
        <Grid className="panel2" item xs={getXs2(matches)}>
          Active Note
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
