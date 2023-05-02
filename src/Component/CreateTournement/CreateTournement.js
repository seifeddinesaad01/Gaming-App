import * as React from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './CreateTournement.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { Grid, CssBaseline, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
//essaie date piker
// import dayjs from 'dayjs';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
//  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DatePicker from 'react-date-picker';
// import { display } from '@mui/system';
//import InputAdornment from '@mui/material/InputAdornment';
//import IconButton from '@mui/material/IconButton';


function CreateTournement() {
  const [Date, setDate] = useState();
  /*****alert mui*****/
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  /*****alert mui*****/
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [values, setValues] = React.useState({
    title: "",
    jeux: "",
    nbparticipants: "",
    date: "",
    link: "",
    photo: ""
  });
  const validateForm = (values) => {
    const error = {};
    if (!values.title) {
      error.title = "Title is required";
    }

    if (!values.jeux) {
      error.jeux = "Jeux is required";
    }

    if (!values.nbparticipants) {
      error.nbparticipants = "Number of max participants is required";
    } else if (!/^[1-9]\d*$/.test(values.nbparticipants)) {
      error.nbparticipants = "Please enter a positive integer";
    }
    if (!values.Date) {
      error.date = "Date is required";
    }
    if (!values.link) {
      error.link = "Discord link is required";
    }
    if (!values.photo) {
      error.photo = "The photo is required";
    }
    return error;
  };

  // const [showPassword, setShowPassword] = React.useState(false);
  const [maxParticipantsError, setMaxParticipantsError] = useState("");


  //const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDateChange = (value) => {
    setDate(value);
    setValues({
      ...values,
      Date: value ? value.toISOString() : "",
    });
  };
  const handleclick = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(values));
    setIsSubmit(true);
  };
  /***envoi des données par axios***/
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const post = {
        title: values.title,
        jeux: values.jeux,
        nbparticipants: values.nbparticipants,
        date: values.Date,
        link: values.link,
        photo: values.photo,
      };
      console.log(post);
      axios.post("http://127.0.0.1:5000/tournament/create-tournament", post)
        .then((response) => {
          console.log("reussit");
          //alert(response.data.message);
          //navigate("/user/login", { replace: true });
        })
        .catch((error) => {
          //setErrorMessage(error.response.data.message);
          console.log("echec");
        });
    }
  }, [formErrors]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", backgroundColor: "#161616" }}    >
      <CssBaseline />
      <Grid container direction="column" spacing={2} sx={{ width: '50%' }}>
        <Grid item >
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: 'center'
          }}>
            <h1
              style={{
                margin: 0,
                color: "#FFFFFF",
                fontFamily: "Mulish, sans-serif",
                fontWeight: 200,
                fontSize: 60,
                marginBottom: 10,
                letterSpacing: "2px"

              }}
            >
              Create Tournament
            </h1>
          </div>
        </Grid>
      </Grid>
      {/*****************formulaire****************/}
      <FormControl required sx={{ m: 1, width: '52ch' }} variant="outlined">
        <InputLabel htmlFor="name"


        >Title</InputLabel>
        <OutlinedInput
          name="title"
          onChange={handleChange}
          value={values.title}
          id="title"
          label="Title"
          sx={{
            '& fieldset': {
              borderColor: '#FFFFFF80',

            },
          }}
          style={{ color: '#ffffff' }}

        />
        <Stack spacing={2} sx={{ width: '100%' }}>
          {formErrors.title && (
            <Alert severity="error">{formErrors.title}</Alert>
          )}
        </Stack>
      </FormControl>

      <FormControl required sx={{ m: 1, width: '52ch' }} variant="outlined">
        <InputLabel htmlFor="name">Jeux</InputLabel>
        <OutlinedInput
          name="jeux"
          onChange={handleChange}
          value={values.jeux}
          id="jeux"
          label="Jeux"
          sx={{
            '& fieldset': {
              borderColor: '#FFFBF5',
            },
          }}
          style={{ color: '#FFFBF5' }}
        />
        <Stack spacing={2} sx={{ width: '100%' }}>
          {formErrors.jeux && (
            <Alert severity="error">{formErrors.jeux}</Alert>
          )}
        </Stack>


        </FormControl>
        {/* testing selector
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth  sx={{ m: 1, width: '52ch' }}>
        <InputLabel id="demo-simple-select-label">Jeux</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.jeux}
          label="jeux"
          onChange={handleChange}
        >
          {/* <MenuItem values="Fortnite">Fortnite</MenuItem>
          <MenuItem value="League of Legends">League of Legends</MenuItem>
          <MenuItem value="Overwatch">Overwatch</MenuItem>
          <MenuItem value="Rainbow Six Siege">Rainbow Six Siege</MenuItem>
          <MenuItem value="Fall Guys: Ultimate Knockout">Fall Guys: Ultimate Knockout</MenuItem>
          <MenuItem value="Dota 2">Dota 2</MenuItem> */}
          {/* <MenuItem value="Fortnite">Fortnite</MenuItem>
<MenuItem value="League of Legends">League of Legends</MenuItem>
<MenuItem value="Overwatch">Overwatch</MenuItem>
<MenuItem value="Rainbow Six Siege">Rainbow Six Siege</MenuItem>
<MenuItem value="Fall Guys: Ultimate Knockout">Fall Guys: Ultimate Knockout</MenuItem>
<MenuItem value="Dota 2">Dota 2</MenuItem>

        </Select>
      </FormControl>
    </Box> */}
        {/* <div>
      <DatePicker onChange={onChange} value={value} />
    </div> */}
      <FormControl required sx={{ m: 1, width: '52ch' }} variant="outlined">
        <InputLabel htmlFor="name" >Number of participants</InputLabel>
        <OutlinedInput
          name="nbparticipants"
          onChange={handleChange}
          value={values.nbparticipants}
          id="nbparticipants"
          label="Nombre of participants"
          type='number'
          sx={{
            '& fieldset': {
              borderColor: '#FFFFFF80',
            },
          }}
          style={{ color: '#ffffff' }}
        />
        <Stack spacing={2} sx={{ width: '100%' }}>
          {/* {formErrors.nbparticipants &&(
          <Alert severity="error">{formErrors.nbparticipants}</Alert>
        )} */}
          {formErrors.nbparticipants && (
            <Alert severity="error">{formErrors.nbparticipants}</Alert>
          )}
          {maxParticipantsError && (
            <Alert severity="error">{maxParticipantsError}</Alert>
          )}

        </Stack>

      </FormControl>

      {/* <FormControl required sx={{ m: 1, width: '52ch' }} variant="outlined">
        <InputLabel htmlFor="name">Date</InputLabel>
        <OutlinedInput
          name="date"
          onChange={handleChange}
          value={values.date}
          id="date"
          label="date"
          sx={{
            '& fieldset': {
              borderColor: '#FFFFFF80',
            },
          }}
          style={{ color: '#ffffff' }}
       />
       <Stack spacing={2} sx={{ width: '100%' }}>
          {formErrors.date &&(
            <Alert severity="error">{formErrors.date}</Alert>
          )}
          </Stack>
      </FormControl> */}

      <>
        {/* <FormControl required sx={{ m: 1, width: '52ch' }}
variant="outlined">
       <div className='date' style={{
        display: "flex"}}>

      <input type="date" handleChange={e=>setDate(e.target.value)}
value={values.Date} id="date" />
       </div>
       <Stack spacing={2} sx={{ width: '100%' }}>
          {formErrors.date &&(
            <Alert severity="error">{formErrors.date}</Alert>
          )}
          </Stack>
       </FormControl> */}
        <FormControl required sx={{ m: 1, width: '52ch' }} variant="outlined">
          <div className='date' style={{ display: "flex" }}>
            {/* <h1>Select Date :</h1> */}
            <input
              type="date"
              id="date"
              value={values.Date}
              onChange={e => setValues({ ...values, Date: e.target.value })}
            />
          </div>
          <Stack spacing={2} sx={{ width: '100%' }}>
            {formErrors.date && (
              <Alert severity="error">{formErrors.date}</Alert>
            )}
          </Stack>
        </FormControl>
      </>

      {/* <DemoItem label="Responsive variant">
  <DatePicker defaultValue={dayjs('2022-04-17')} />
</DemoItem>  */}
      <FormControl required sx={{ m: 1, width: '52ch' }} variant="outlined">
        <InputLabel htmlFor="name">Link</InputLabel>
        <OutlinedInput
          name="link"
          onChange={handleChange}
          value={values.link}
          id="link"
          label="Link"
          sx={{
            '& fieldset': {
              borderColor: '#FFFFFF80',
            },

          }}
          style={{ color: '#ffffff' }}
        />
        <Stack spacing={2} sx={{ width: '100%' }}>
          {formErrors.link && (
            <Alert severity="error">{formErrors.link}</Alert>
          )}
        </Stack>
      </FormControl>

      <FormControl required sx={{ m: 1, width: '52ch' }} variant="outlined">
        <InputLabel htmlFor="name">Photo</InputLabel>
        <OutlinedInput
          name="photo"
          onChange={handleChange}
          value={values.photo}
          id="photo"
          label="Photo"
          sx={{
            '& fieldset': {
              borderColor: '#FFFFFF80',
            },

          }}
          style={{ color: '#ffffff' }}
        />
        <Stack spacing={2} sx={{ width: '100%' }}>
          {formErrors.photo && (
            <Alert severity="error">{formErrors.photo}</Alert>
          )}
        </Stack>
      </FormControl>
      <div onClick={handleclick}>
        <Button
          name='button' type='submit'
          style={{
            backgroundColor: '#343beb',
            borderRadius: "50px",
            letterSpacing: "3px",
            marginTop: '50px',
            width: "200px",
          }}
          onClick={handleclick}
        >
          add Tournement
        </Button>
      </div>

    </Grid>

  );
}
export default CreateTournement;