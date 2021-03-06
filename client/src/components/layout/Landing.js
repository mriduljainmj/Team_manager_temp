import React from "react";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


const Landing = ({isAuthenticated}) => {

  if(isAuthenticated){
   return  <Redirect to="/dashboard" />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Team Connector</h1>
          <p className="lead">
            Create member profile/portfolio, share posts and get help from other
            members.
          </p>
          <div class="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign-up
            </Link>
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


Landing.propTypes={
  isAuthenticated:PropTypes.bool.isRequired
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
