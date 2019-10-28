import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import classnames from "classnames";

const Login = (props) =>{

  const [formState, setFormState] = useState({
    email:'',
    password:''
  })

  const handleFormChange = (e) => setFormState({
    ...formState,
    [e.target.id]: e.target.value,
  });

  const [errorState, setErrorState] = useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  });

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formState);

    axios.post('/api/users/login', formState)
    .then(res=>{
      console.log(res.data);
      if(res.status === 200){

        props.history.push('/auth');
        
      }
      else{
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err=>{
      console.log(err);
      console.log(err.response.data);
      setErrorState(err.response.data);
    })
  }

    return (

      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="yoonix-link waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="">
                Don't have an account? <Link to="/register" className="yoonix-link">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={handleSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={handleFormChange}
                  value={formState.email}
                  error={errorState.email}
                  id="email"
                  type="email"
                  className={classnames("",{invalid: errorState.email})}
                  style={{color:"white"}}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errorState.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={handleFormChange}
                  value={formState.password}
                  error={errorState.password}
                  id="password"
                  type="password"
                  className={classnames("",{invalid: errorState.password})}
                  style={{color:"white"}}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errorState.password}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="yoonix-bouton yoonix-bouton-imp"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Login;