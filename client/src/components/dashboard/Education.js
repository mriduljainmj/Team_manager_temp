import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {deleteEducation} from "../../actions/profile"

const Education = ({ education,deleteEducation }) => {
  const educations = education.map((edu) => (
      
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {edu.fieldOfstudy}
      </td>
      <td>
        <button class="btn btn-danger" onClick={()=>deleteEducation(edu._id)}>Delete</button>
      </td>
    </tr>
    
  ));

  return (
    <>
    
      <h2 class="my-2">Education Credetials</h2>
      <table class="table">
        <thead>
          <tr>
            <th>School</th>
            <th class="hide-sm">Degree</th>
            <th class="hide-sm">Field of Study</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         {educations}
        </tbody>
      </table>
    </>
  );
};

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired
};

export default connect(null,{deleteEducation})(Education);
