import ajax from "../common";
const getList = ({ params }) => {
  return ajax({
    url: "api/news/toutiao",
    method: "get",
    params
  });
};
const updateList = ({ params }) => {
  return ajax({
    url: "api/news/toutiao/index",
    method: "get",
    params
  });
};
const createPost = ({ params }) => {
  return ajax({
    url: "api/posts/create",
    method: "post",
    data: params
  });
};
export default {
  getList,
  updateList,
  createPost
};
