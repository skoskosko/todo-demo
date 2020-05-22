import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'


function HeaderBar() {
  return (
    <AppBar position="static" color="primary">
      <Typography variant="h6">
        Title
      </Typography>
    </AppBar>
  );
}

export default HeaderBar;
