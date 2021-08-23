import React, { Component } from "react";
import PropTypes from "prop-types";
import { CreatePost } from ".";
import { deletePost, createComment } from "../actions/posts";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
class PostsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
    };
  }
  handleAddComment = (e, id) => {
    const { comment } = this.state;
    const { posts } = this.props;

    if (e.key === "Enter") {
      this.props.dispatch(createComment(comment, id));
      console.log(comment);
      console.log(id);
      // clear comment
      this.setState({
        comment: "",
      });
    }
  };

  handleOnCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  imageClick = (e, id) => {
    console.log("Click!!!!");
    console.log(id);
    this.props.dispatch(deletePost(id));
  };

  render() {
    const { posts } = this.props;

    const { comment } = this.state;
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const userId = user._id;
    return (
      <div className="posts-list">
        {token && <CreatePost />}

        {posts.map((post) => (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-pic"
                />
                <div>
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">a minute ago</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>

              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>

                <div className="post-comments-icon">
                  <img
                    src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
                {userId === post.user._id && (
                  <div className="post-delete-icon">
                    <img
                      src="https://www.pngarts.com/files/4/Delete-Button-PNG-Download-Image.png"
                      alt="comments-icon"
                      onClick={(e) => this.imageClick(e, post._id)}
                    />
                  </div>
                )}
              </div>
              <div className="post-comment-box">
                <input
                  placeholder="Start typing a comment"
                  name="comment"
                  // onChange={this.handleOnCommentChange}
                  onChange={(e) => this.handleOnCommentChange(e)}
                  onKeyPress={(e) => this.handleAddComment(e, post._id)}
                  // value={comment}
                />
              </div>

              <div className="post-comments-list">
                <div className="post-comment-item">
                  {/* <div className="post-comment-header">
                    <span className="post-comment-author">
                      {comment.user.name}
                    </span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">
                      {comment.likes.length} likes
                    </span>
                  </div> */}

                  <div className="post-comment-content">{comment.content}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}
PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(PostsList);
