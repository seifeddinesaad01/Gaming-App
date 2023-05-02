import React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
function GestTournois() {
  return (
    <div>
    <NavLink to="/Createtournament" style={{ textDecoration: "none" }} >
              <Button  sx={{ borderRadius: '20px', color: 'white', backgroundColor: '#343beb', marginLeft: "550px" }}>
                Create New tournament
              </Button>
            </NavLink>

    </div>
  );
}

export default GestTournois;