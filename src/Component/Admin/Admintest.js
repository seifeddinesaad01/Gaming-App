import React, { useEffect } from 'react';
import './Admintest.css';
import { Grid } from '@mui/material';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import ImageInput from '../../ImageInput/ImageInput';
import axios from 'axios';
import GestTournois from './GestTournois';
import GestUtili from './Manageusers';
import Alltours from './AllTournaments';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Addtour from '../CreateTournement/CreateTournement';
import Divider from '@mui/material/Divider';
function Admintest(props) {
    const [clickState, setClickState] = useState("profile");
const handleButtonClick = (button) => {
    console.log(button);
    setClickState(button);
}
const [open, setOpen] = React.useState(true);
const handleClick = () => {
  setOpen(!open);}
return (
    <Grid container direction="row" justifyContent="center"
        className='boutton'>
        <Grid item className='barLeft' xs={2} >
        {/* <h1>Admin</h1> */}
        <br></br>
            <br />
            <Button
                onClick={() => handleButtonClick('Manage users')}
                className={clickState === 'boutton' ? 'button active' : 'button'}
            >
               Manage users
            </Button>
            <Divider light />
            {/* <Button
                onClick={() => handleButtonClick('Manage tournemant')}
                className={clickState === 'profile' ? 'button active' : 'button'}
            >
                Manage tournemant
            </Button> */}
             <List >
      <ListItemButton onClick={handleClick}  className={clickState === 'boutton' ? 'button active' : 'button'} >
        <ListItemText primary="Manage Tournaments"  />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider light />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 6 }} onClick={() => handleButtonClick('Create Tournament')}  className={clickState === 'boutton' ? 'button active' : 'button'}>
            <ListItemText primary="Create Tournament" />
          </ListItemButton>
          <Divider light />
          <ListItemButton sx={{ pl: 6 }} onClick={() => handleButtonClick('All Tournaments')}  className={clickState === 'boutton' ? 'button active' : 'button'}>
            <ListItemText primary="All Tournaments" />
          </ListItemButton>
          <Divider light />
        </List>
      </Collapse>
    </List>
            <Button
                onClick={() => handleButtonClick('Manage videos')}
                className={clickState === 'boutton' ? 'button active' : 'button'}
            >
              Manage videos
            </Button>
            <Divider light />
        </Grid>

        <Grid item className='barRight' xs={7}>
            {clickState === 'Manage users' && <Grid container>
            <GestUtili/>
            </Grid>}
            {clickState === 'Create Tournament' && <Grid container> <Addtour/></Grid>}
            {clickState === 'All Tournaments' && <Grid container> <Alltours/></Grid>}
            {clickState === 'Manage videos' && <h1>Manage videos</h1>}

        </Grid>
    </Grid>
);

}
export default Admintest;