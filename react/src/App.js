import React, { useState } from 'react'
import HeaderBar from './components/HeaderBar'
import NoteList from './components/NoteList'
import NoteCard from './components/NoteCard'
import ApiHandler from './handlers/ApiHandler'
import Grid from "@material-ui/core/Grid"
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Container } from '@material-ui/core'
import './App.css'

/**
 * getDirection is to define wanted element order on page.
 * If list and note should be in a row or a cloumn
 * @param {Boolean} mediaQuery Tells if current screen width is larger than sm
 */
function getDirection(mediaQuery) {
  if (mediaQuery) return "row"// larger than sm
  else return "column" // smaller than sm
}

/**
 * getXs1 Retruns width of panel1 the note list panel
 * @param {Booelan} mediaQuery Tells if current screen width is larger than sm
 */
function getXs1(mediaQuery) {
  if (mediaQuery) return 4 // larger than sm
  else return "auto" // smaller than sm
}

/**
 * getXs2 return widt of panel2 the note panel
 * @param {Boolean} mediaQuery  Tells if current screen width is larger than sm
 */
function getXs2(mediaQuery) {
  if (mediaQuery) return 8 // larger than sm
  else return "auto" // smaller than sm
}

/**
 * handleListDrag is used as a callback function for NoteList Component.
 * @param {Object} result Object containing arrays source and destination with note items
 */
function handleListDrag(result) {
  apiHandler.handleDrag(result)
}

/**
 * handleActive is used as a callback for NoteList and HeaderBar
 * To set currently active note
 * @param {number | null} result integer number of the current active id. or null
 */
function handleActive(result) {
  apiHandler.setActive(result)
  apiHandler.callCallback()
}

/**
 * deletenote is callback for NoteList
 * @param {number} id id of the note to be deleted
 */
function deleteNote(id) {
  apiHandler.deleteNote(id)
}

/**
 * editNote is callback for NoteList
 * @param {Object} note Note object to be edited. Containing changing data and id
 */
function editNote(note) {
  apiHandler.editNote(note)
}

/**
 * addNote is used as a callback for HeaderBar
 * @param {Object} note  Note object to be edited
 */
function addNote(note) {
  apiHandler.addNote(note)
}

/**
 * handleUser is callback function for NoteList and Header bar
 * @param {object | number} data on add it is object with name:string on delete it is number
 * @param {string} what add or delete, so lazy programmers can use single function for many things by adding useless comparisions
 */
function handleUser(data, what) {
  if (what === "add") apiHandler.addUser(data)
  if (what === "delete") apiHandler.deleteUser(data)
}

/**
 * searchCB is callback function for HeaderBar
 * @param {string} term search term to search
 * @param {callback} cb Calbback to fire when found something
 */
function searchCb(term, cb) {
  cb(apiHandler.find(term))
}

/**
 * apiHandler is single class to handle all api calls. It is always used here and not passed around,
 * because when it was programmed that was what was done. 
 * It could be passed around for cleaner code and less callbacks.
 */
var apiHandler = new ApiHandler()

/**
 * App is the applications main component.
 * It is written as functional react because appereantly that is how it is done now.
 * It containts single page application for handling notes and needs no props.
 */
function App() {
  const [n, setN] = useState(0);
  function updateState() {
    setN(n + 1)
  }
  apiHandler.setCallback(updateState)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <div className="App">
      <HeaderBar searchCb={searchCb} addCb={addNote} users={apiHandler.getUsers()} userCb={handleUser} handleActive={handleActive} ></HeaderBar>
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

export default App
