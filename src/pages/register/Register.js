import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch,  } from 'react-redux';
import { register } from '../../redux/apiCalls';
import { FormGroup } from '@material-ui/core';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Register Page {" "}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root:{
   '& .MuiTypography-body1':{
     color:'black',
     textTransform:'uppercase',
     cursor:'pointer' ,
   }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));

export default function Register() {
  const classes = useStyles();
  const dispatch=useDispatch()
  const [isSubmit, setIsSubmit] = useState(false);
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
const[password,setPassword]=useState('')
const [isAdmin, setIsAdmin] = useState(true);


  const handleregister=(e)=>{
    e.preventDefault();
    setIsSubmit(true)
    register(dispatch,{firstName,lastName,username,email,password,isAdmin});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
              error={isSubmit && !firstName && true}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="lastName"
                autoComplete="firstName"
                onChange={(e)=>setFirstName(e.target.value.toLowerCase())}
                helperText={isSubmit && !firstName  && 'Required..!'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={isSubmit && !lastName && true}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                onChange={(e)=>setLastName(e.target.value.toLowerCase())}
                helperText={isSubmit && !lastName  && 'Required..!'}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 error={isSubmit && !username && true}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username "
                name="username"
                autoComplete="username"
                onChange={(e)=>setUsername(e.target.value.toLowerCase())}
                helperText={isSubmit && !username  && 'Required..!'}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 error={isSubmit && (!email || !(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i).test(email) )  && true}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>setEmail(e.target.value.toLowerCase())}
                helperText={(isSubmit && !email) ? 'Required..!' : (isSubmit && !(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i).test(email)) && 'Email Invalid..!' }
               
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 error={isSubmit && !password && true}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value.toLowerCase())}
                helperText={isSubmit && !password  && 'Required..!'}

              />
            </Grid>
            <Grid item xs={12} >
        <FormGroup className={classes.root}>
  <FormControlLabel control={<Checkbox defaultChecked disabled checked style={{color :'#f50057'}}/>} label="Admin"/>
</FormGroup>

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleregister}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={Button} variant="body2"  >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    
      <Box mt={2} >
        <Copyright />
      </Box>
    </Container>
  );
}
