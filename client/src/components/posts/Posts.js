import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <p>spinner</p>
  ) : (
    <>
      <h1 class="large text-primary">
            Posts
        </h1>
        <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>
        <PostForm/>
        <div className="posts">
            {posts.map(post=>(
                <PostItem key={post._id} post={post}/>
            ))}
        </div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStatesToProps = (state) => ({
  post: state.post,
});

export default connect(mapStatesToProps, { getPosts })(Posts);
