import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div class="profile-about bg-light p-1">
      <h2 class="text-primary">
        {name.charAt(0).toUpperCase() + name.slice(1)}'s Bio
      </h2>
      <p>{bio}</p>
      <div class="line"></div>
      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">
        {skills.map((skill, index) => (
          <div class="p-1" key={index}>
            <i class="fas fa-check"></i>
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
