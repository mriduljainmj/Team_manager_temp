import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getGithubRepos} from '../../actions/profile'


const ProfileGithub = ({username,getGithubRepos,repos}) => {

    useEffect(()=>{
        getGithubRepos(username)
    },[getGithubRepos,username])

    return (
            <div class="profile-github">
                <h2 class="text-primary my-1" ><i class="fab fa-github"></i>Github Repo's</h2> 
                    {repos === null ? <p>No Repo's Found</p>:(
                        repos.map((repo)=>(
                            <div className="repo bg-white my-1 p-1" key={repos._id}>
                             <div>
                                <h4><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h4>
                                <p>{repo.description}</p>
                            </div>
                            </div>
                        ))
                    )}
                    </div>
    )
}

ProfileGithub.propTypes = {
    username:PropTypes.string.isRequired,
    getGithubRepos:PropTypes.array.isRequired,
    repos:PropTypes.array.isRequired
}

const mapStatesToProps = state =>({
    repos:state.profile.repos
})

export default connect(mapStatesToProps,{getGithubRepos})(ProfileGithub)
