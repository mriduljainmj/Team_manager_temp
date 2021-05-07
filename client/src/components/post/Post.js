import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <p>spinner</p>
  ) : (
    <>
      <Link to="/posts" className="btn btn-primary">
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => {
          return (
            <>
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};

const mapStatesToProps = (state) => ({
  post: state.post,
});

export default connect(mapStatesToProps, { getPost })(Post);