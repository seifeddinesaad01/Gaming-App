import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Admin.css';
import GestTournois from './GestTournois';
import GestUtili from './GestUtili';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography >{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{ flexGrow: 1,  bgcolor: 'black', display: 'flex', height: 800 }}
    ><><br></br><></><br></br><></>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              height: "100px",
              width: "100vw",
                borderRight: 1,
                borderColor: 'divider',
                color: 'white'
            }}>
            <Tab  className="tab" label="Manage users"  {...a11yProps(0)} />
            <Tab className="tab" label="Manage tournemant" {...a11yProps(1)} />
            <Tab  className="tab" label="Manage videos" {...a11yProps(2)} />
        </Tabs>
      <TabPanel value={value} index={0} >
       <GestUtili/>
      </TabPanel>
      <TabPanel value={value} index={1}>
         <GestTournois/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      Manage videos
      </TabPanel>
      </>
    </Box>
  );
}
