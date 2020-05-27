import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import NoteDialog from './NoteDialog'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
  menu: {
    width: '50ch',
  },
}));

function HeaderBar(props) {
  const [member, setMember] = React.useState({ searchterm: '' });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchEvent, setSerchEvent] = React.useState(null);
  const [searched, setSearced] = React.useState({ items: [] });


  const handleChange = (event) => {
    setSerchEvent(event.currentTarget);
    setMember({ searchterm: event.target.value })
  };

  const handleSearch = (event) => {
    if (event.currentTarget !== '') props.searchCb(member.searchterm, handleMenu)
    // setAnchorEl(event.currentTarget);
  };

  const handleMenu = (object_array) => {
    console.log("Top_bar_says_HEYY HEYYY!! shino miya saaan!!", object_array)
    setSearced({ items: object_array })
    setAnchorEl(searchEvent);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchClick = (id) => {
    // setAnchorEl(null);
    props.handleActive(id)
  };
  



  const classes = useStyles();
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          key="search-input"
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <NoteDialog cb={props.addCb} userCb={props.userCb} users={props.users} buttonMode="Add" />
        </IconButton>



        <Typography className={classes.title} variant="h6" noWrap>
          Esko Takku - Note Demo
          </Typography>
        <div className={classes.search}>

          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>

          <InputBase
            placeholder="Enter to search"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={member.searchterm}
            onChange={handleChange}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleSearch(event)
              }
            }}
            inputProps={{ 'aria-label': 'search' }}
          />

        </div>
      </Toolbar>

      <Menu
        key="search-menu"
        className={classes.menu}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableAutoFocus={true}
      >
        {searched.items.length > 0 ?

          <div>
            {searched.items.map((item, index) => (
              <MenuItem onClick={() => {searchClick(item.id)}} className={classes.menu} key={'search_item_' + item.id}>
                <ListItemText primary={item.title} />
              </MenuItem>
            ))}
          </div>
          : <div> <MenuItem className={classes.menu} key={'search_item'}>
            <ListItemText primary="No Results" />
          </MenuItem>
          </div>}
      </Menu>


    </AppBar>
  );
}

export default HeaderBar;
