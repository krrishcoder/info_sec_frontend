import React, { useState, useEffect } from 'react';
import {useLocation,useNavigate } from 'react-router-dom'





export default function Otpinput(props) {


  const AUTH_URL = `${props.base_url}/gauth`
 

  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const location = useLocation();  // access username from here

  const { username, path } = location.state || {};

  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status


  useEffect(() => {
    if (isLoggedIn) {
      // Navigate to the Welcome page upon successful login

      if(path && path === 'welcome'){
        navigate('/welcome')
      }else if(path && path === 'setnewpass'){
        navigate('/setnewpass', { state: { username: username } })
      }

     
      // go to password change
    }
  }, [isLoggedIn, navigate]);

  
  document.body.style.backgroundColor = '#333333'


  const handleChange = (e, index) => {
    const value = e.target.value;

    setOtp(value)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // verify the otp
try{

    if( username===""){
        throw new Error('Bad Request');
      }

    const response  =  await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_token:otp, username : username }),
    })


    if (!response.ok) {
      const data = await response.json(); 
      if (response.status === 400 || response.status === 403) {
        throw new Error(data.message);
      } else if (response.status === 401) {
        throw new Error(data.message);
      } else if (response.status === 404) {
        throw new Error('Endpoint not found');
      } else if (response.status === 500) {
        throw new Error('Server error, please try again later');
      } else {
        throw new Error('Something went wrong');
      }
    }


    // If the response is OK, parse the JSON data
    const data = await response.json();
    console.log('Login successful:', data);
    props.showAlert("2ND AUTH success", 'success')
    setIsLoggedIn(true);  // Set login state to true on successful login
        


   }catch(error){

    console.error('Error during login:', error.message);
    props.showAlert(`error during 2nd auth catch - ${error.message}`, 'error')


  };


 


  }

  

  return (
    
    <div style={{display:'flex', justifyContent:'center',height:'100vh' ,alignItems:'center', color:'white' }}>

      <div  className="card" style={{width: '18rem', backgroundColor:'black'}}>
     
      <h3 style={{color:'#dee2e6'}} className='my-3 mx-3'>Enter OTP</h3> 
      <input onChange={handleChange}  className='my-3' style={{backgroundColor:'#495057', color:'#adb5bd', borderRadius:'2px solid #adb5bd'}}  value={otp} type="text" placeholder="Enter OTP"  maxlength="6"></input>
  
        <br>
        </br>
        <span style={{color:'white', textAlign:'center' }}>
        *Open google auth app or<br></br>
        any other auth app
          </span>
       
        <br>
        </br>
        <button className="btn btn-primary mx-4 my-5" type="submit" onClick={handleSubmit} style={{left:'15vh'}}>
          Verify OTP
        </button>


        </div>

    </div>


  );


};


