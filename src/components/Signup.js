import React, { useState , useEffect} from 'react'
import {Link,  useNavigate,} from 'react-router-dom'



export default function Signup(props) {


  const BASE_URL = `${props.base_url}/signup`

  const navigate = useNavigate();
  const [qrurl, setQrUrl] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);  // Track login status

  const [formData, setFormData] = useState({
    id:'',
    fullname: '',
    username: '',
    password:'',
    cpassword:''
  });

  useEffect(() => {
    if (isSignedUp) {
      // Navigate to the Welcome page upon successful login
      navigate('/qrauth',{ state: { qr_url: qrurl } }  );
    }
  }, [isSignedUp, navigate]);



  const handleChange= (e)=>{

    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
      id: formData.username + formData.fullname
    }));

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
   
     
try{
      const response = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'CSRF-Token' : csrfToken,
          },
          body: JSON.stringify(formData),
        })

        console.log("respose is : ")
        console.log(response.ok)

        if (!response.ok) {
          const data = await response.json(); 
          if (response.status === 400) {
            throw new Error(data.message);
          } else if (response.status === 401) {
            throw new Error(data.message);
          } else if (response.status === 404) {
            throw new Error(data.message);
          } else if (response.status === 500) {
            throw new Error('Server error, please try again later');
          } else {
            throw new Error('Something went wrong');
          }
        }

      const data = await response.json(); 

      setQrUrl(data.qr_url)
      setIsSignedUp(true);
      props.showAlert("Sign up success", 'success')
      // const data = await response.json();


    }catch(error){

      console.error('Error during signup:', error.message);
      props.showAlert(`error during SignUp- ${error.message}`, 'error')

    }
   
  }


  return (
    <div>

<section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: "185px"}} alt="logo" />
                    <h2 className='my-1'>Sign up Page</h2>
                </div>

                <form>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example11">Name</label>
                    <input type="email"  name='fullname' className="form-control" value={formData.fullname}
                     onChange={handleChange}
                      placeholder="Full Name" />
                   
                  </div>
             

                  <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example11">Username</label>
                    <input type="email"  name="username" className="form-control" value={formData.username}
                     onChange={handleChange}
                      placeholder="Phone number or email address" />
                   
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example22">Set a Password</label>
                    <input type="password" value={formData.password} name="password" onChange={handleChange} className="form-control"  />
                    
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example22">Confirm the Password</label>
                    <input type="password"  name="cpassword" value={formData.cpassword} onChange={handleChange} className="form-control"   />
                    
                  </div>


                  <div className="text-center pt-1 mb-5 pb-1">
                    <button data-mdb-button-init data-mdb-ripple-init onClick={handleSubmit} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Sign Up</button>
                      <br></br>
                      <div style={{ fontFamily: "Arial, sans-serif", color: "#808080" }}>

                     
                      Already exist an acccount? <Link  to="/">Login</Link>

                      </div>
                      
                  
                  </div>
                  

                

                </form>

              </div>
            </div>
            <div className="col-lg-2"></div>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
  )
  
}
