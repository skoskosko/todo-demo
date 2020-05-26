import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import NoteDialog from './NoteDialog'
import NoteDeleteDialog from './NoteDeleteDialog'
import MenuItem from '@material-ui/core/MenuItem';

// const useStyles = makeStyles({
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });



export default function SimpleCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if(props.noteId){
      setAnchorEl(event.currentTarget);
    }
    

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const classes = useStyles();
  var assignee = ""
  if (props.assignedTo) assignee = props.assignedTo.name;

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
        <Typography variant="body2" style={{whiteSpace: 'pre-line'}}>
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
         <MenuItem> <NoteDialog text={props.text} title={props.title} assignedTo={props.assignedTo} noteId={props.noteId} cb={props.editCb} userCb={props.userCb} users={props.users} buttonMode="Edit"  /> </MenuItem>
         <MenuItem> <NoteDeleteDialog  noteId={props.noteId} deleteCb={props.deleteCb}/> </MenuItem>
      </Menu>
    </Card>
    
  );
}
