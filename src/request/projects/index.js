import ajax from "../common";
const getProjectsList = ({ params }) => {
  return ajax({
    url: "api/groups/list",
    method: "get",
    params
  });
};
const createProject = ({ params }) => {
  return ajax({
    url: "api/groups/create",
    method: "post",
    data: params
  });
};
const getProjectsDetail = ({ params }) => {
  return ajax({
    url: "api/groups/detail",
    method: "get",
    params
  });
};
export default {
  getProjectsList,
  createProject,
  getProjectsDetail
};
