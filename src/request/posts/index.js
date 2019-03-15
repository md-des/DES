import ajax from "../common";
const getList = ({ params }) => {
  return ajax({
    url: "/api/posts/list",
    method: "get",
    params
  });
};
const createPost = ({ params }) => {
  return ajax({
    url: "/api/posts/create",
    method: "post",
    data: params
  });
};
const getPostDetail = ({ params }) => {
  return ajax({
    url: "/api/posts/getPost",
    method: "get",
    params
  });
};
const updatePost = ({ params }) => {
  return ajax({
    url: "/api/posts/update",
    method: "post",
    data: params
  });
};
const deletePost = ({ params }) => {
  return ajax({
    url: "/api/posts/remove",
    method: "post",
    data: params
  });
};
const search = ({ params }) => {
  return ajax({
    url: "/api/posts/search",
    method: "get",
    params
  });
};
export default {
  getList,
  createPost,
  getPostDetail,
  updatePost,
  deletePost,
  search
};
