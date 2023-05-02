import React, { useEffect } from 'react';
import '../Profile/Profile.css';
import { Grid } from '@mui/material';
import Button from '@material-ui/core/Button';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useState } from 'react';
import ImageInput from '../../ImageInput/ImageInput';
import axios from 'axios';

function Profile(props) {
    const [name, setUserName] = useState("");
    const [lastname, setUserLastName] = useState("");
    // const [activeButton, setActiveButton] = useState(null);
    // const handleButtonClick = (event) => {
    //     // Supprimer la classe active de l'ancien bouton
    //     if (activeButton) {
    //         activeButton.classList.remove('active');
    //     }

    //     // Ajouter la classe active au nouveau bouton
    //     event.target.classList.add('active');
    //     setActiveButton(event.target);
    // }
    // function UserProfile(props) {
    //     return <h1>profile</h1>;
    // }

    // function Followed(props) {
    //     return <h1>Followed</h1>;
    // }
    const id = props.id;
    useEffect(() => {
        axios.get(`http://localhost:5000/user/${id}`)
            .then((response) => {
                setUserName(response.data.name);
                setUserLastName(response.data.lastname);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



// axios.get("http://localhost:5000/user/reset-password/${id}/${token}")
//     .then((res) => {
//         const expirationDate = new Date(res.data.expirationDate);
//         setDate({ expirationDate });

//     })
//     .catch((err) => {
//         console.log(err);
//     });

const [clickState, setClickState] = useState("profile");
const handleButtonClick = (button) => {
    console.log(button);
    setClickState(button);
}

return (
    <Grid container direction="row" justifyContent="center"
        className='profile'>
        <Grid item className='barLeft' xs={3} >
            <h1 style={{ marginLeft: '10px' }}>Me</h1>
            <br />
            <Button
                // className={activeButton === 'profile' ? 'button active' : 'button'}
                startIcon={<PersonIcon style={{ color: '#434ebe', fontSize: '3.5rem' }} />}
                onClick={() => handleButtonClick('profile')}
                className={clickState === 'profile' ? 'button active' : 'button'}
            >
                Profile
            </Button>
            <Button
                startIcon={<FavoriteBorderIcon style={{ color: '#434ebe', fontSize: '3rem' }} />}
                onClick={() => handleButtonClick('followed')}
                className={clickState === 'followed' ? 'button active' : 'button'}
            >
                Followed
            </Button>
            <Button
                startIcon={<Diversity1Icon style={{ color: '#434ebe', fontSize: '3rem' }} />}
                onClick={() => handleButtonClick('followers')}
                className={clickState === 'followers' ? 'button active' : 'button'}
            >
                Followers
            </Button>
            <Button
                startIcon={<EmojiEventsIcon style={{ color: '#434ebe', fontSize: '3rem' }} />}
                onClick={() => handleButtonClick('tournaments')}
                className={clickState === 'tournaments' ? 'button active' : 'button'}
            >
                Tournaments
            </Button>
        </Grid>

        <Grid item className='barRight' xs={7}>
            {clickState === 'profile' && <Grid container>
                <Grid item direction="row" >
                    <ImageInput />
                    <div>
                        <p>Name : {name}</p>
                        <p>LastName : {lastname}</p>

                    </div>
                </Grid>
            </Grid>}
            {clickState === 'followed' && <h1>followed</h1>}
            {clickState === 'followers' && <h1>followers</h1>}
            {clickState === 'tournaments' && <h1>tournaments</h1>}

        </Grid>
    </Grid>
);

}
export default Profile;