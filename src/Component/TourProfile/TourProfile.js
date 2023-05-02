import '../TourProfile/TourProfile.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import '../Tournaments/Tournaments.css';
import manetteicon from '../img/manetteicon.png';
import val from '../img/val.jpg';
import participants from '../img/participants.png';
import calendar from '../img/calendar.png';
import location from '../img/location.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { format } from 'date-fns';
function formatDate(date) {
  return format(date, 'EEEE, MMMM do  yyyy');
}

function LabTabs() {
  const [value, setValue] = React.useState('1');
  const { id } = useParams();
  const [data, setData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/tournament/all-tournament`)
      .then((response) => {
        setData(response.data);
        console.log("data rendred");

      })
      .catch((error) => {
        console.log(error);
        console.log("data not found")
      });
  }, []);

  const tournament = data.filter(item => item._id === id)[0];


  return (
    <Box className="b1" >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: '#161616', width: "95vw" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Details" value="1" />
            <Tab label="Participants" value="2" />
            <Tab label="Rules" value="3" />
            <Tab label="Videos" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className='Detail'>
            {tournament && (
              <div>

                <div className='GR'>Game & Region</div>
                <div className='G'>{tournament.jeux}</div>
                <div className='R'> Tunisia-online</div>

                <div className='borderblack' />

                <div className='GR'>Date & Time</div>
                <div className='G'>
                  {formatDate(new Date(tournament.date))}
                </div>
                <div className='R'> 11:00 PM </div>

                <div className='borderblack' />

                <div className='GR'>Description </div>
                <div className='R'> decription ici !!!!! </div>

                <div className='borderblack' />

                <div className='l'>To participate</div>
                <a className='linkparticipate' href={tournament.link}>Click here to participate</a>

                <div className='br' />
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel value="2">liste des participants</TabPanel>
        <TabPanel value="3">
          <div className='Rules'>
          {tournament && (
  <div>
    {tournament.jeux === 'free fire' ? (
      <p>
        General rules<br/><br/>

The Free Fire eStream tournament is an online tournament.
All teams are required to read the tournament rules and regulations.
Participation in the tournament means that the team agrees to abide by all rules and regulations.
Any team that violates the rules will be disqualified from the tournament.

<br/><br/>
Punctuality<br/><br/>
All teams and players must be in the dedicated Discord Room lobby (link on details page) and ready to play no later than 5 minutes before the match begins. If the team is not ready, they will be penalized.

<br/><br/>
Match postponement or cancellation<br/>
<br/>
Matches will start as per schedule and be shortened unless prior notice is given by eStream of postponement or cancellation.
Teams that violate the rules will be penalized and punished.
<br/><br/>
Tournament progress<br/><br/>
Registration<br/><br/>
❖ Registration is free.<br/>
❖ Registration will be done through the eStream portal.<br/>
❖ Participants must use a personal account when registering.<br/>
❖ Each participant can only be a member of one team in the tournament.<br/>
❖ Team names and nicknames in the game should not contain any explicit/vulgar content
words.<br/>
❖ The team must consist of a minimum of four members and a maximum of six members
members.<br/>
❖ All matches are in Battle Royale Squad Mode.
after registration.<br/>
❖ Registered team members cannot be changed/replaced.<br/>
Teams are only allowed to play with registered players difference
Found using multiple accounts will be disqualified.<br/>
❖ It is not recommended to use VPN and other supporting network connection applications.<br/>
❖ Players are responsible for their internet connection and eStream Premier
Series org will not be responsible for any network or connectivity issues.<br/><br/>
Tournament format<br/><br/>
Tournament format is agreed upon in a Descord room in Description.
       
      </p>
    ) : tournament.jeux === 'fortnite' ? (
      <div>
        Content to render if tournament.jeux is 'fortnite'
      </div>
    ) : tournament.jeux === 'call of duety' ? (
      <div>
        Content to render if tournament.jeux is 'call of duty'
      </div>
    ) : (
      <div>
        Content to render if tournament.jeux is something else
      </div>
    )}
  </div>
)}

          </div>
        </TabPanel>

        <TabPanel value="4">Videos</TabPanel>
      </TabContext>
    </Box >
  );
}



function TourProfile() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  //convertion de temps
  // function convertTime(time24) {
  //   const [hours, minutes] = time24.split(':');

  //   const hours12 = hours % 12 || 12;

  //   const amPm = hours < 12 ? 'AM' : 'PM';

  //   return `${hours12}:${minutes} ${amPm}`;
  // }

  useEffect(() => {
    axios.get(`http://localhost:5000/tournament/all-tournament`)
      .then((response) => {
        setData(response.data);
        console.log("data rendred");

      })
      .catch((error) => {
        console.log(error);
        console.log("data not found")
      });
  }, []);

  const tournament = data.filter(item => item._id === id)[0];

  return (
    <Grid container direction="row" justifyContent="center" className="gridblack"  >
      <div className="divgris" >
        {tournament && (
          <div className='tpimgbg' style={{ backgroundImage: `url(${val})` }}>
            <div className='title-p'>{tournament.title}</div>
            <div className='details-p'>
              <div className='jeux-p'>
                <img src={`${manetteicon}`} alt='manette' className='manette-p' />{tournament.jeux}
              </div>
              <div className='participants-p'>
                <img src={`${participants}`} alt='participants' className='particon-p' />{tournament.nbparticipants} participants
              </div>
              <div className='date-p'>
                <img src={`${calendar}`} alt='calender' className='calendar-p' />
                {/* {tournament.date} */}
                {new Date(tournament.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                <div className='time-p'>at 11:00 PM</div>
              </div>
              <div className='region-p'>
                <img src={`${location}`} alt='location' className='location-p' />Tunisia-online
              </div>
            </div>
            <LabTabs />
          </div>
        )}


      </div>

    </Grid>





  );
}

export default TourProfile;

// {/* <Grid sx={{ height: "40vh", marginTop: "50px" }} item xs={12} className='tour' >

//           {tournament && (
//             <div style={{ backgroundImage: `url(${val})` }}>
//               <div className='title'>{tournament.title}</div>
//               <div className='jeux'>
//                 <img src={`${manetteicon}`} alt='manette' className='manette' />{tournament.jeux}
//               </div>
//               <div className='participants'>
//                 <img src={`${participants}`} alt='participants' className='particon' />{tournament.nbparticipants} participants
//               </div>
//               <div className='date'>
//                 <img src={`${calendar}`} alt='calender' className='calendar' />
//                 {new Date(tournament.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//               </div>
//             </div>
//           )}*/}