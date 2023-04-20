import  TextField  from "@mui/material/TextField";
import  Grid  from "@mui/material/Grid";
import React from "react";
import signin from '../assets/images/signin.jpg'
import PersonIcon from '@mui/icons-material/Person';
import  InputAdornment  from "@mui/material/InputAdornment";
import HttpsIcon from '@mui/icons-material/Https';
import { Button, Checkbox, Typography } from "@mui/material";
// import '../Assets/Classes/login.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  //  const navi=useNavigate();
  const [a,seta]=useState(false)
  const login=()=>{
    localStorage.setItem('isLogin',false)
    seta(!a)

    console.log('hii');
    // navi("/DashboardPage")
  }
  if(a){
   return <Redirect to='/'></Redirect>
   
  }
  
  return (
    <div style={{backgroundColor:'#f8f8f8',paddingTop:'40px',height:'600px'}}>
    <div className="top2">
    <div style={{width:'80%',margin:'0 auto',lineHeight:'60px'}} className="top">
      <Grid  container spacing={2} >
        <Grid item md={6}  xs={12}>
            <img src={signin}/>
        </Grid>
        <Grid item md={6}  xs={12}>
        <div style={{width:'280px',paddingLeft:'15%'}}>
            <Typography className="sign_up">Sign up</Typography>
            <div style={{marginTop:"30px"}}>        
                <TextField 
        className="input_box"
          
          id="standard-error-helper-text"
          placeholder="User Name"
          value="User"

          variant="standard"
          sx={{width:'100%',marginTop:'0px'}}   
          InputProps={{
            style:{
                color:'#999',fontSize:'15px'
            },
             startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{fontSize:'18px',color:'black'}}/>
              </InputAdornment>
            ),
          }}
        /><br/>
         <TextField      
       id="standard-error-helper-text"
      type="password"
       value="Password"
       placeholder="Password"
       variant="standard"
       sx={{width:'100%'}}   
       InputProps={{
        style:{
            color:'#999',fontSize:'15px'
        },
          startAdornment: (
           <InputAdornment position="start">
             <HttpsIcon sx={{fontSize:'18px',color:'black'}}/>
           </InputAdornment>
         ),
       }}
     />
    </div>
    <div style={{textAlign:'left',fontSize:'15px',color:'#222'}}><Checkbox size="medium" sx={{color:'#999'}}/> Remember me </div>
    
    <Button className="btn" color="primary" variant="contained" onClick={login}>Login</Button>


    <div className="icons">
      <p>or login with</p>
      <p style={{marginTop:'30px'}}>
       <span><FacebookIcon sx={{fontSize:'35px',color:'#3b5998'}}/></span>
       <span><TwitterIcon sx={{fontSize:'35px',color:'#1da0f2'}}/></span>
       <span><GoogleIcon sx={{fontSize:'35px',color:'#e72734'}}/></span>
       </p>
    </div>
    </div>

    
        </Grid>
      
      </Grid>
    </div>
    </div>
    </div>
  );
};

export default LoginPage;
