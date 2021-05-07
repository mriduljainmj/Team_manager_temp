import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";


// import Spinner from "../layout/Spinner";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
   
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <div>spinner</div>
  ) : (
    <>
      <h1 class="large text-primary">Dashboard</h1>
      <p class="lead">
        <i class="fas fa-user"></i>
        Welcome,{" "}
        {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
      </p>
      {profile !== null ? (
        <>
          <div>
            <DashboardActions />
            {loading || profile.experience === null ? (
              ""
            ) : (
              <Experience experience={profile.experience} />
            )}
            {loading || profile.education === null ? (
              ""
            ) : (
              <Education education={profile.education} />
            )}

        <div class="my-2">
            <button class="btn btn-danger" onClick={()=>deleteAccount()}>
                <i class="fas fa-user"></i>Delete My Account
            </button>
        </div>

          </div>
        </>
      ) : (
        <>
          <p>Please Create a profile</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount:PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard);
