import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import {deleteExperience} from '../../actions/profile'

const Experience = ({ experience,deleteExperience }) => {
  const experiences = experience.map((exp) => (
      
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? "Now" : <Moment format="YY/MM/DD">{exp.to}</Moment>}
      </td>
      <td>
        <button class="btn btn-danger" onClick={()=>deleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>
    
  ));

  return (
    <>
      <h2 class="my-2">Experience Credetials</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th class="hide-sm">Title</th>
            <th class="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         {experiences}
        </tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired
};

export default connect(null,{deleteExperience})(Experience);
