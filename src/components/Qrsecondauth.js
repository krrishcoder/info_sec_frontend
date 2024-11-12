import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate, Link } from 'react-router-dom'

export default function Qrsecondauth(props) {

   const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { qr_url } = location.state || {}; // Access qr_url from state

    document.body.style.backgroundColor = '#333333'


  useEffect(() => {
    if (isLoggedIn) {
      // Navigate to the Welcome page upon successful login
      navigate('/' );
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e)=>{
    setIsLoggedIn(true)

  }
   
    
  return (

    <div style={{display:'flex', justifyContent:'center',height:'100vh' ,alignItems:'center'}}>

  <div className="card" style={{width: '18rem'}}>
  <img className="card-img-top" src={qr_url} alt='qr code' />

  <div className="card-body d-flex flex-column align-items-center">
    <h5 className="card-title"> </h5>
    <p className="card-text">*Scan this with Google auth app or any other auth app</p>
    <Link to="/" className="btn btn-primary  my-1">go to Login Page</Link>
  </div>
</div>

</div>

  
  )
}
