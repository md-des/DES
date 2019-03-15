import ajax from "../common";
const getProjectsList = ({ params }) => {
  return ajax({
    url: "/api/groups/list",
    method: "get",
    params
  });
};
const createProject = ({ params }) => {
  return ajax({
    url: "/api/groups/create",
    method: "post",
    data: params
  });
};
const getProjectsDetail = ({ params }) => {
  return ajax({
    url: "/api/groups/detail",
    method: "get",
    params
  });
};
const deleteProject = ({ params }) => {
  return ajax({
    url: "/api/groups/remove",
    method: "post",
    data: params
  });
};
const renameProject = ({ params }) => {
  return ajax({
    url: "/api/groups/rename",
    method: "post",
    data: params
  });
};
const updateProject = ({ params }) => {
  return ajax({
    url: "/api/groups/update",
    method: "post",
    data: params
  });
};
export default {
  getProjectsList,
  createProject,
  getProjectsDetail,
  deleteProject,
  renameProject,
  updateProject
};
