import React, { useState } from "react";
import { validationRules} from "../utils/validate";
import validate from "../utils/validation";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonClicked, setisButtonClicked] = useState(false);
  const [error, setErrors] = useState({});

  //validate Fields
  const validateFields = (data) => {
    const fieldInvalidList = validate(data, validationRules());
    console.log("fieldInvalidList", fieldInvalidList);
    if (fieldInvalidList !== undefined) {
      setErrors({ ...fieldInvalidList });
    }
    return !fieldInvalidList;
  };

  const loginUser = async (event) => {
    event.preventDefault();
    let jsondata = {
      email: email,
      password: password,
    };
    if (!validateFields(jsondata)) return;
    setisButtonClicked(true);
    axios
      .post("http://localhost:5000/api/user/login", jsondata)
      .then(function (response) {
        console.log("response", response);
        if (response.data.statusCode === 200) {
          console.log("Success", response);
          setisButtonClicked(false);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          window.location.href = "/dashboard";
          toast("Logged In Successfully!");
        } else {
          toast(response.data.message);
          setisButtonClicked(false);
        }
      })
      .catch(function (error) {
        console.log("err", error);
        toast(error);
      });
  };

  return (
    <>
      <div class="form-container page-login">
        <div class="ui centered grid container">
          <div class="nine wide column">
            <div class="ui fluid card">
              <div class="content">
                <form class="ui form" method="POST" onSubmit={loginUser}>
                  <div class="field">
                    <label>Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter Your Email Id"
                      id="email"
                      name="email"
                    ></input>
                    {error.email && error.email[0]}
                  </div>
                  <div class="field">
                    <label>Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="******"
                      id="password"
                      name="password"
                    ></input>
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

export default Login;
