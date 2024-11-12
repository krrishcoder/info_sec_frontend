import React, {useState} from 'react'
import './style.css'
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import Alert from './components/Alert'
import Qrsecondauth from './components/Qrsecondauth';
import OTPinput from './components/Otpinput.js';
import Forgetpass from './components/Forgetpass.js';
import Setnewpass from './components/Setnewpass.js';

//https://info-sec-backend.onrender.com/
// const BASE_URL = "http://localhost:3000"
const BASE_URL = "https://info-sec-backend.onrender.com"

function App() {

  const [alert , setAlert] = useState(null);
  

  const showAlert = (message, type)=>{

    setAlert({
      msg: message,
      type: type   // sucess-login
    })


    setTimeout(() => {
      setAlert(null);
    }, 4000);

  }

  
  return (
    <Router>
    <Alert alert={alert} />

    <Routes>

   
      <Route exact path="/"  element={<Login showAlert={showAlert} base_url={BASE_URL} />} />
      <Route exact path="/signup"  element={<Signup  showAlert={showAlert} base_url={BASE_URL} />} />
      <Route path="/welcome" element={<Welcome showAlert={showAlert}  base_url={BASE_URL}/> } />
      <Route path="/qrauth" element={<Qrsecondauth showAlert={showAlert} base_url={BASE_URL} /> } />
      <Route path="/otpinput" element={<OTPinput showAlert={showAlert} base_url={BASE_URL}/> } />
      <Route path="/forgetpass" element={<Forgetpass showAlert={showAlert} base_url={BASE_URL}/> } />
      <Route path="/setnewpass" element={<Setnewpass showAlert={showAlert} base_url={BASE_URL}/> } />
     
      </Routes>
    </Router>
  );
}

export default App;
