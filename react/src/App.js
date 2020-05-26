import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import NoteList from './components/NoteList';
import NoteCard from './components/NoteCard';
import ApiHandler from './handlers/ApiHandler';
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
  apiHandler.handleDrag(result)
}

function handleActive(result){
  apiHandler.setActive(result)
  apiHandler.callCallback()
}
function deleteNote(id){
  apiHandler.deleteNote(id)
}

function editNote(note){
  apiHandler.editNote(note)
}

function addNote(note){
  apiHandler.addNote(note)
}

function handleUser(data, what){
  if(what==="add") apiHandler.addUser(data)
  if(what==="delete") apiHandler.deleteUser(data)
}

var apiHandler = new ApiHandler();

function App() {
  const [n, setN] = useState(0);
  function updateState(){
    setN(n + 1);
  }
  apiHandler.setCallback(updateState)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div className="App">
      <HeaderBar addCb={addNote} users={apiHandler.getUsers()} userCb={handleUser} ></HeaderBar>

      <Grid className="fill" container direction={getDirection(matches)}>
        <Grid className="panel1" item xs={getXs1(matches)}>
          <NoteList items={apiHandler.getNotes()} handleDrag={handleListDrag} handleActive={handleActive} />
        </Grid>
        <Grid item xs={getXs2(matches)}>
          <Container className="panel2" >
            <NoteCard title={apiHandler.getActive().title} users={apiHandler.getUsers()} assignedTo={apiHandler.getActive().assignedTo} text={apiHandler.getActive().text} userCb={handleUser} noteId={apiHandler.getActive().id} deleteCb={deleteNote} editCb={editNote} />
          </Container>
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
