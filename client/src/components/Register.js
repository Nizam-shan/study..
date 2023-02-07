import React from "react";
import { useState } from "react";
import axios from "axios";

const Register = () => {

    const [user ,setUser] = useState({
        name: "", email:"", phoneNumber:"", password:"", confPassword:""
    });

    let name , value
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value
        setUser({...user,[name]:value})
    }

    const postData = async(e) => {
            e.preventDefault()  
        try {

            const {name, email, phoneNumber, password, confPassword } = user 
            const res = await axios.post('http://localhost:8000/register',user ,{
                
                Headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name, email, phoneNumber, password, confPassword
                })
             })

            if(!res){
                window.alert("not uploaded")
            }
            console.log(res);
            window.alert("User added")
            console.log(user);
        } catch (error) {
           console.log(error); 
        }
    }
    return (
        <>
            <div>
            <section class="vh-100" >
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" >
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4" method="POST" onSubmit={postData}>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text"  name="name" id="name" value={user.name} onChange={handleChange} class="form-control" />
                      <label class="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" name="email" value={user.email} onChange={handleChange}  class="form-control" />
                      <label class="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>


                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="number" id="form3Example1c" name="phoneNumber" value={user.phoneNumber} onChange={handleChange}  class="form-control" />
                      <label class="form-label" for="form3Example1c">Mobile number</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" name="password" value={user.password} onChange={handleChange}  class="form-control" />
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" name="confPassword" value={user.confPassword} onChange={handleChange}  class="form-control" />
                      <label class="form-label" for="form3Example4cd">Confirm Password</label>
                    </div>
                  </div>

                 

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg" >Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image" />

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

export default Register;