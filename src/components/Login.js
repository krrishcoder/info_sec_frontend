import React, { useState, useEffect  }  from 'react'
import {Link, useNavigate} from 'react-router-dom'





export default function Login(props) {

  const LOGIN_URL = `${props.base_url}/login`



  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      // Navigate to the Welcome page upon successful login
      navigate('/otpinput', { state: { username: formData.username ,path: 'welcome'} } );
    }
  }, [isLoggedIn, navigate]);






  const handleChange= (e)=>{

    const { name, value } = e.target;


    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));

  }


  


  const handleSubmit = async (e) => {
    e.preventDefault();

   

    try{

      if(formData.password==="" || formData.username===""){
        throw new Error('Bad Request');
      }

    const response  =  await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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
    <div>

<section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: "185px"}} alt="logo" />
                  <h4 className="mt-1 mb-5 pb-1">We are The DUCS Team</h4>
                </div>

                <form>
                  <p>Please login to your account</p>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="email" value={formData.username} onChange={handleChange} name='username' className="form-control"
                      placeholder="Phone number or email address" />
                    <label className="form-label" htmlFor="form2Example11">Username</label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password"  value={formData.password} name='password' onChange={handleChange} className="form-control" />
                    <label className="form-label" htmlFor="form2Example22">Password</label>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button data-mdb-button-init data-mdb-ripple-init onClick={handleSubmit} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Log
                      in</button>
                      <br></br>
                    <Link className="text-muted" to="/forgetpass">Forgot password?</Link>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <Link  type="button"  data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger" to="/signup">Create new</Link>
                  </div>

                </form>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">This is a Task given in Information security to learn 2 auth </h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



    </div>
  )
}
