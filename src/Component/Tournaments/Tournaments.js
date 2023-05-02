import React from 'react';
import { Grid } from '@mui/material';
import '../Tournaments/Tournaments.css';
import tourimage from '../img/tourimage.PNG';
import manetteicon from '../img/manetteicon.png';
import val from '../img/val.PNG';
import participants from '../img/participants.png';
import calendar from '../img/calendar.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
function Tournaments() {
  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/tournament/all-tournament")
      .then((response) => {
        setData(response.data);
        console.log(data);
        console.log("data rendred");

      })
      .catch((error) => {
        console.log(error);
        console.log("data  not found")
      });
  }, []);

  return (
    <Grid container direction="row" justifyContent="center" className="grid1"  >
      <Grid className="grid2" spacing={4}>

        <div item xs={12} className='imgbg' style={{ backgroundImage: `url(${tourimage})` }}>
          <div className='txt'>
            <br /><br /><br /><br />
            Tournaments
          </div></div>
        <Grid sx={{ height: "40vh", marginTop: "50px" }} item xs={12} className='tour' >
          {data.map(item => (
            <div key={item._id} style={{ backgroundImage: `url(${val})` }}>
              <div className='title'>{item.title}</div>
              <div className='jeux'>
                <img src={`${manetteicon}`} alt='manette' className='manette' />{item.jeux}
              </div>
              <div className='participants'>
                <img src={`${participants}`} alt='participants' className='particon' />{item.nbparticipants} participants
              </div>
              <div className='date-t'>
                <img src={`${calendar}`} alt='calender' className='calendar-t' />
                {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <NavLink to={`/tournaments/${item._id}`}>
                <button type='submit' className='btn' >See more</button>
              </NavLink>
            </div>
          ))}
        </Grid>
        {/* <Grid container xs={4} className='tourbox'>
            <h1>hi</h1>
          </Grid>
          <Grid container xs={4} className='tourbox'>
            <h1>hi</h1>
          </Grid> */}
      </Grid>
    </Grid>

  );
}

export default Tournaments;