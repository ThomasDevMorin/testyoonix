import React, { Component } from "react";
import { Link } from "react-router-dom";


class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1>
              Yoonix
            </h1>
              <Link to="/auth" className="yoonix-link waves-effect"
                style={{
                  margin: "0 0 15px 0"
                }}
              >
                <i className="material-icons left">lock</i> Secured page
              </Link>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  letterSpacing: "1.5px"
                }}
                className="yoonix-bouton yoonix-bouton-imp"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  letterSpacing: "1.5px"
                }}
                className="yoonix-bouton"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;