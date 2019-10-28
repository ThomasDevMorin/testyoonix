import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Auth(){
	const[message, setMessage] = useState({message1:'Loading ...', message2:''});

	useEffect(() => {
		axios.get('/api/users/auth')
	      .then(res => {
	      	const fullMessage1 = 'Welcome ' + res.data.name;
	      	const fullMessage2 = 'You are authentificied with ' + res.data.email
	        setMessage({message1: fullMessage1, message2: fullMessage2 });
	      })
	      .catch(err => {	
	        setMessage({message1: "Sorry, you are not allowed to be here !", message2: err.response.data});
	      })
	});


	return(
		<div className="container">
	        <div style={{ marginTop: "4rem" }} className="row">
	          <div className="col s8 offset-s2">
	            <Link to="/" className="yoonix-link waves-effect">
	              <i className="material-icons left">keyboard_backspace</i> Back to
	              home
	            </Link>
	            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
	              <h2>
	                <b>{message.message1}</b> 
	              </h2>
	              <h4>
	              	<p>
	              		{message.message2}
	              	</p>
	              </h4>
	            </div>
	          </div>	
	        </div>
        </div>
	)
}

export default Auth;