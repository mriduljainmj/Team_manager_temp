import React from 'react'
import {Link} from "react-router-dom"

import PropTypes from 'prop-types'

const ProfileItem = ({profile:{
    user:{_id,name,avatar},
    status,
    company,
    location,
    skills
}
}) => {
    return (
        
        <div className="profile bg-light">

            <img src={avatar} alt="default"
                    class="round-img" />
                <div>
                    <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                    <p>{status} {company && <span> at {company}</span>}</p>
                    <p>{location && <span>{location}</span>}</p>
                    <Link to={`/profile/${_id}`} class="btn btn-primary">
                        View Profile
                    </Link>
                </div>
                <ul>
                    {skills.slice(0,4).map((skill,index)=>(
                        <li key={index} className="text-primary">
                            <i className="fas fa-check" /> {skill}
                        </li>
                    ))}
                    
                </ul>
        </div>
        
    )
}

ProfileItem.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileItem
