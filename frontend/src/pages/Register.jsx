import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

import { RegisterValidation } from "../utils/validate";
import validate from "../utils/validation";


//Register Component
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({});
  
  //validate Fields
  const validateFields = (data) => {
    const fieldInvalidList = validate(data, RegisterValidation());
    console.log("fieldInvalidList", fieldInvalidList);
    if (fieldInvalidList !== undefined) {
      setErrors({ ...fieldInvalidList });
    }
    return !fieldInvalidList;
  };

  const saveUser = async (event) => {
    event.preventDefault();
    let jsondata = {
      name: name,
      email: email,
      password: password,
    };
    if (!validateFields(jsondata)) return;
    console.log("jsondata", jsondata); 
    axios.post('http://localhost:5000/api/user/register', jsondata)
    .then(function (response) {
      console.log("response register",response);
     if(response.data.statusCode === 200){
      console.log("Success",response);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      window.location.href = '/dashboard';
      toast("User Registered Successfully!");
     }else{
      toast(response.data.message)
     }
    })
    .catch(function (error) {
      console.log("err",error);
      toast(error)
    });
  };

  return (

<>    
  <div class="form-container page-login">
  <div class="ui centered grid container">
    <div class="nine wide column">
      <div class="ui fluid card">
        <div class="content">
        <form class="ui form" method="POST" onSubmit={saveUser}>
          <div class="field">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Your Name' id="name" name="name" ></input>
            {error.name && error.name[0]}
            </div>
            <div class="field">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Your Email Id' id="email" name="email" ></input>
            {error.email && error.email[0]}
          </div>
          <div class="field">
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='******' id="password" name="password" ></input>
            {error.password && error.password[0]}
          </div>
          <button class="ui primary labeled icon button" type="submit">
            <i class="lock alternate icon"></i>
            Login
          </button>
        </form>
        </div>
      </div>
    </div>
  </div>
</div>
    </>


  );
}

export default Register;
