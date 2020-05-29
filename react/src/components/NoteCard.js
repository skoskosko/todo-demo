import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import NoteDialog from './NoteDialog'
import NoteDeleteDialog from './NoteDeleteDialog'
import MenuItem from '@material-ui/core/MenuItem'

/**
 * NoteCard is one of the two core elements in this app. 
 * It displays currently active note or instructs users on how to get started.
 * @param {props} props
 * @param {number | null} props.noteId id of the note to be displays if null edit and delete cant be used 
 * @param {string} props.title title of the note
 * @param {string} props.text body text of the note
 * @param {callback | null} props.editCb callback to be used by NoteDialog not needed if noteID is null
 * @param {callback | null} props.userCb callback to be used by NoteDialog not needed if noteID is null
 * @param {array | null} props.users array of users to be used by NoteDialog
 * @param {callback | null} props.deleteCb callback to be used by NoteDeleteDialog not needed if noteID is null
 * @param {object | null} props.assignedTo ovject containing users "id" and "name"
 */
export default function NoteCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  /**
   * Function that allows menu to open if id is defined
   * @param {event} event clickEvent
   */
  const handleClick = (event) => {
    if (props.noteId) {
      setAnchorEl(event.currentTarget)
    }
  }

  /**
   * Closes popup menu
   */
  const handleClose = () => {
    setAnchorEl(null)
  }

  /**
   * assignee is needed for rendering. so it is defined here. As it is not always passed.
   */
  var assignee = ""
  if (props.assignedTo) assignee = props.assignedTo.name

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={assignee}
      />

      <CardContent>
        <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
          {props.text}
        </Typography>
      </CardContent>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem> <NoteDialog text={props.text} title={props.title} assignedTo={props.assignedTo} noteId={props.noteId} cb={props.editCb} userCb={props.userCb} users={props.users} buttonMode="Edit" /> </MenuItem>
        <MenuItem> <NoteDeleteDialog noteId={props.noteId} deleteCb={props.deleteCb} /> </MenuItem>
      </Menu>
    </Card>
  )
}
