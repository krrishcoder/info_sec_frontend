import React,{useEffect, useState} from 'react'
import {useLocation,useNavigate } from 'react-router-dom'




export default function Setnewpass(props) {

    const _URL = `${props.base_url}/setnewpass`

    const navigate = useNavigate();
    const location = useLocation();  // access username from here

    document.body.style.backgroundColor = '#333333'

    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status

    const { username } = location.state || {};

    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');


    const handleChange = (e, index) => {
        const value = e.target.value;
    
        setPassword(value)
    
      };
    

      const handleCChange = (e, index) => {
        const value = e.target.value;
    
        setCpassword(value)
    
      };


    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
      }, [isLoggedIn, navigate]);


      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // verify the otp
    try{
    
        if( username===""){
            throw new Error('Bad Request');
          }
    
        const response  =  await fetch(_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username : username,password: password }),
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
        props.showAlert("password chnage success", 'success')
        setIsLoggedIn(true);  // Set login state to true on successful login
            
    
    
       }catch(error){
    
        console.error('Error during login:', error.message);
        props.showAlert(`error during 2nd auth catch - ${error.message}`, 'error')
    
    
      };
    
    
     
    
    
      }
    




  return (

<div className="mainDiv" style={{display:'flex', justifyContent:'center',height:'100vh' ,alignItems:'center', color:'#333333' }}>
  <div className="cardStyle">
    <form action="" method="post" name="signupForm" id="signupForm">
      

      
    <div className="inputDiv">
      <label className="inputLabel" htmlFor="password">New Password</label>
      <input type="password" id="password" name="password" value={password} onChange={handleChange} required />
    </div>
      
    <div className="inputDiv">
      <label className="inputLabel" htmlFor="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleCChange} value={cpassword}/>
    </div>
    
    <div className="buttonWrapper">
      <button type="submit" id="submitButton" onClick={handleSubmit} className="submitButton pure-button pure-button-primary">
        <span>Continue</span>
      </button>


    </div>
      
  </form>
  </div>
</div>

  )
}
