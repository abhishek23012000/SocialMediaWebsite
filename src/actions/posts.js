import { UPDATE_POSTS, ADD_POST, ADD_COMMENT } from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody, getAuthTokenFromLocalStorage } from "../helpers/utils";
export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function addPost(post, id) {
  return {
    type: ADD_POST,
    post,
    id,
  };
}

export function createPost(content, id) {
  return (dispatch) => {
    const url = "http://localhost:8000/api/v1/posts/create";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, user: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('dATA', data);

        if (data.success) {
          dispatch(addPost(data.data.post, id));
        }
      });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    const url = `http://localhost:8000/api/v1/posts/${id}`;
    console.log("dATA", url);

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('dATA', data);
        dispatch(fetchPosts());
      });
  };
}

export function createComment(content, id) {
  return (dispatch) => {
    const url = "http://localhost:8000/api/v1/comments/create";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, id));
        }
        console.log("dATA comment is", data.data.comment);
      });
  };
}
export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}
