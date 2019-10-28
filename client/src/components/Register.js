import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import classnames from "classnames";


const Register = (props) =>{

  const [formState, setFormState] = useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  });

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

    axios.post('/api/users/register', formState)
    .then(res=>{
      alert(res.data.message);
      props.history.push('/login');
    })
    .catch(err=>{
      setErrorState(err.response.data);
    })
  }

    return (

      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="yoonix-link waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="">
                Already have an account? <Link to="/login" className="yoonix-link">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={handleSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={handleFormChange}
                  value={formState.name}
                  error={errorState.name}
                  id="name"
                  type="text"
                  className={classnames("",{invalid: errorState.name})}
                  style={{color:"white"}}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errorState.name}</span>
              </div>
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
              <div className="input-field col s12">
                <input
                  onChange={handleFormChange}
                  value={formState.password2}
                  error={errorState.password2}
                  id="password2"
                  type="password"
                  className={classnames("",{invalid: errorState.password2})}
                  style={{color:"white"}}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errorState.password2}</span>
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

}

export default Register;