import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';



const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



export default function NoteDialog(props) {
  
  const [assignee, setAssignee] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [assigneeOpen, setAssigneeOpen] = React.useState(false);
  const [userDelete, setUserDelete] = React.useState(false);

  const handleClickOpen = () => { 
    if (props.assignedTo) setAssignee(props.assignedTo.id)
    setOpen(true); 
  };
  const handleClose = () => { setOpen(false); };
  const openAsigneeAdd = () => { setAssigneeOpen(true) };
  const closeAsigneeAdd = () => { setAssigneeOpen(false) };
  const openUserDelete = () => { setUserDelete(true) };
  const closeUserDelete = () => { setUserDelete(false) };
  const handleSave = () => {
    const note = {
      id: props.noteId,
      text: document.getElementById("editable-note-text").value,
      title: document.getElementById("editable-note-title").value,
      assignee: assignee
    };
    props.cb(note);
    setOpen(false);
  };
  const handleUserAdd= () => {
    const name = document.getElementById("new-user-name").value;
    props.userCb(name, "add")
    setAssigneeOpen(false)
  };
  const handleUserDelete= () => {    
    props.userCb(assignee, "delete")
    setUserDelete(false)
  };
  
  return (
    <div>
      {props.buttonMode === "Edit" ? <div onClick={handleClickOpen}><EditIcon /> Edit </div>
        : <div onClick={handleClickOpen}><AddIcon /></div>}



      <Dialog fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <TextField
            id="editable-note-title"
            label="Title"
            type="text"
            name="title"
            defaultValue={props.title}
            fullWidth={true}
          />
        </DialogTitle>
        <DialogContent dividers>

            <InputLabel shrink id="select-note-assignee-label">
              Assignee
          </InputLabel>
            <Select
              labelId="select-note-assignee-label"
              id="select-note-assignee"
              value={assignee}
              displayEmpty
              onChange={(e) => {setAssignee(e.target.value)}}
              className={styles.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props.users.map((value, index) => {
                return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
              })}
              
            </Select>

            <AddIcon onClick={openAsigneeAdd}/>
            <DeleteIcon  onClick={openUserDelete} />


        </DialogContent>
        <DialogContent dividers>
          <TextField
            id="editable-note-text"
            label="Body"
            fullWidth={true}
            type="text"
            name="text"
            defaultValue={props.text}
            multiline
          />

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            {props.buttonMode === "Edit" ? <div>Save Changes</div>
              : <div>Add Note</div>}
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog onClose={closeAsigneeAdd} aria-labelledby="customized-dialog-title" open={assigneeOpen}>
        <DialogTitle id="customized-dialog-title" onClose={closeAsigneeAdd}>
          <TextField
            id="new-user-name"
            label="Username"
            type="text"
            name="username"
          />
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleUserAdd} color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog onClose={closeUserDelete} aria-labelledby="customized-dialog-title" open={userDelete}>
        <DialogActions>
          <Button autoFocus onClick={handleUserDelete} color="primary">
            Delete Selected User
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
