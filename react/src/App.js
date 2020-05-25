import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import NoteList from './components/NoteList';
import NoteCard from './components/NoteCard';
import NoteHandler from './handlers/NoteHandler';
import Grid from "@material-ui/core/Grid";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container } from '@material-ui/core';

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
  notesHandler.handleDrag(result)
}

function handleActive(result){
  notesHandler.setActive(result)
  notesHandler.callCallback()
}
function deleteNote(id){
  notesHandler.deleteNote(id)
}

function editNote(note){
  notesHandler.editNote(note)
}

function addNote(note){
  notesHandler.addNote(note)
}

var notesHandler = new NoteHandler();

function App() {
  const [n, setN] = useState(0);
  function updateState(){
    setN(n + 1);
  }
  notesHandler.setCallback(updateState)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div className="App">
      <HeaderBar addCb={addNote}></HeaderBar>

      <Grid className="fill" container direction={getDirection(matches)}>
        <Grid className="panel1" item xs={getXs1(matches)}>
          <NoteList items={notesHandler.getNotes()} handleDrag={handleListDrag} handleActive={handleActive} />
        </Grid>
        <Grid item xs={getXs2(matches)}>
          <Container className="panel2" >
            <NoteCard title={notesHandler.getActive().title} text={notesHandler.getActive().text} noteId={notesHandler.getActive().id} deleteCb={deleteNote} editCb={editNote} />
          </Container>
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
