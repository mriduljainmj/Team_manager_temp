import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem"

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      {loading ? (
        <p>spinner</p>
      ) : (
        <>
          <h1 class="large text-primary">Team Members</h1>
          <p class="lead">
            <i class="fas fa-search"></i>
            Browse and work with other members
          </p>
          <div class="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles Found</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStatesToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStatesToProps, { getProfiles })(Profiles);
