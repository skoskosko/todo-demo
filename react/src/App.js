import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import NoteList from './components/NoteList';
import NoteHandler from './handlers/NoteHandler';
import Grid from "@material-ui/core/Grid";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './App.css';

function getDirection(mediaQuery) {
  if(mediaQuery) return "row"// larger than sm
  else return "column" // smaller than sm
}
function getXs1(mediaQuery) {
  if(mediaQuery) return 4 // larger than sm
  else  return "auto" // smaller than sm
}
function getXs2(mediaQuery) {
  if(mediaQuery) return 8 // larger than sm
  else  return "auto" // smaller than sm
}


function handleListDrag(result){
  console.log("App.js change", result)
  
  // if (result.source && result.destination) array_move(items, result.source.index, result.destination.index )
  // move item from spot
  // source.index to destination.index
  notesHandler.handleDrag(result)
}

var notesHandler = new NoteHandler();

function App() {
  const [n, setN] = useState(0);
  function updateState(){
    setN(n + 1);
    // console.log(notesHandler.getNotes())
  }
  notesHandler.setCallback(updateState)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div className="App">
      <HeaderBar></HeaderBar>

      <Grid className="fill" container direction={getDirection(matches)}>
        <Grid className="panel1" item xs={getXs1(matches)}>
          <NoteList items={notesHandler.getNotes()} handleDrag={handleListDrag} />
        </Grid>
        <Grid className="panel2" item xs={getXs2(matches)}>
          Active Note
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
