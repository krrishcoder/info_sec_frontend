import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'




export default function Forgetpass(props) {

    const _URL = `${props.base_url}/forgetpass/usernameverify`

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status

    
    const [username, setUsername] = useState('')

      const handleChange= (e)=>{

        const { name, value } = e.target;
        setUsername(value)

      }


      useEffect(() => {
        if (isLoggedIn) {
          // Navigate to the Welcome page upon successful login
          navigate('/otpinput',{ state: { username: username ,path:'setnewpass'} });
        }
      }, [isLoggedIn, navigate]);



      
    document.body.style.backgroundColor = '#333333'
    
    const handleSubmit = async (e) => {
    e.preventDefault();

    try{

      if(username===""){
        throw new Error('Bad Request');
      }

    const response  =  await fetch(_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': username
      },
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
    props.showAlert("login success", 'success')
    setIsLoggedIn(true);  // Set login state to true on successful login


  }catch(error){

    console.error('Error during login:', error.message);
    props.showAlert(`error during login catch - ${error.message}`, 'error')


  }
  
  }; 
      








  return (
    <div style={{display:'flex', justifyContent:'center',height:'100vh' ,alignItems:'center', color:'white' }}>

    <div  className="card" style={{width: '18rem', backgroundColor:'black'}}>
   
    <div data-mdb-input-init className="form-outline mb-4 my-3">
                    <input type="text" value={username} onChange={handleChange} name='username' className="form-control"
                      placeholder="Username" />
                    <label className="form-label" htmlFor="form2Example11" style={{color:'white'}} >Username</label>
                  </div>

      <br>
      </br>
      <button className="btn btn-primary mx-4 my-5" type="submit" onClick={handleSubmit} style={{left:'15vh'}}>
        Verify Username
      </button>


      </div>

  </div>
  )
}
