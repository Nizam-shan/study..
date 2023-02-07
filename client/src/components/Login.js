import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const[user, setUser] = useState({
    email:"", password:""
  })
const history = useHistory();
let name , value
  const handleInputs = (e) => {
    e.preventDefault();
    name= e.target.name;
    value= e.target.value;
    setUser({...user,[name]:value});
  }

  const getData = async(e) => {
    e.preventDefault();
   try {
    const {email,password} = user
    const res = await axios.post('http://localhost:8000/Login' ,user,{
      Headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        password
      })
    })
    if(! res){
      window.alert("Not logged in check if you are registered")
    }else{
      console.log(res);
      window.alert("logged in")
      history.push('./arosh')
    }
   
   } catch (error) {
    console.log(error);
    window.alert("Not logged in check if you are registered")
    
   }
    
  }

    return (
        <>
            <div>
            <section class="vh-100" >
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card border border-radius-2" >
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" class="img-fluid" />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form  onSubmit={getData}>

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" ></i>
                    <span class="h1 fw-bold mb-0">Logo</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" >Sign into your account</h5>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example17" class="form-control form-control-lg" value={user.email} name="email" onChange={handleInputs} />
                    <label class="form-label" name="email"  for="form2Example17">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example27" class="form-control form-control-lg" value={user.password} name="password" onChange={handleInputs}  />
                    <label class="form-label" name="password" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-5 pb-lg-2 blue-200" >Don't have an account? <a href="./Register"
                      >Register here</a></p>
                  <a href="#!" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 
     </div>
        </>
    )
}

export default Login;