import React from 'react';
//Possibilité d'ajouter les données d'un user (photo...)
// import pers1 from '../img/pers1.jpg';
// import pers2 from '../img/pers2.jpg';
// import pers3 from '../img/pers3.jpg';
// import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Users from './Allusers';
function GestUtili() {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
   // <img src={pers1}/>
    <Stack  direction="column" spacing={3}>
    <List sx={{ width: '200%', maxWidth: 360, bgcolor: 'black', }}>
      <h2> Users </h2>
        {/* affichage des données d'utilisateurs
        <Grid container>
      <Grid item xs={0}>
      <ListItem>
      <Avatar  src={pers1} />
      <Typography variant="subtitle1" sx={{ color: 'white' }} >Nour Saidane</Typography>
       </ListItem>
       </Grid>
       </Grid>
       <ListItem>
      <Avatar src={pers2} />
      <Typography variant="subtitle1">Nour Saidane</Typography>
      </ListItem>
      <ListItem>
      <Avatar src={pers3} />
      <Typography variant="subtitle1">Nour Saidane</Typography>
      </ListItem>
      </List> */}
      <Users></Users>
      </List>
    </Stack>
  );
}

export default GestUtili;