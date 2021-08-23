import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../actions/posts";
import jwtDecode from "jwt-decode";
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleOnClick = (e) => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwtDecode(token);

      console.log("user", user);
      const id = user._id;

      this.props.dispatch(createPost(this.state.content, id));

      this.setState({
        content: "",
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          value={this.state.content}
          onChange={this.handleChange}
        />

        <div>
          <button id="add-post-btn" onClick={this.handleOnClick}>
            Add Post
          </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(CreatePost);
