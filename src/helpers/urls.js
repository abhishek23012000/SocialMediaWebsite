// import { data } from "../actions/data";

// const API_ROOT = "http://localhost:8000/api/v1";

// export const APIUrls = {
//   login: () => `${API_ROOT}/users/create-session`,
//   signup: () => `${API_ROOT}/users/signup`,
//   fetchPosts: (page = 1, limit = 5) =>
//     `${API_ROOT}/posts?page=${page}&limit=${limit}`,
// };

const API_ROOT = 'http://localhost:8000/api/v1';

export const APIUrls = {
  login: () => `${API_ROOT}/users/create-session`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchPosts: (page = 1, limit = 5) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
};
