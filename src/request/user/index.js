import ajax from "../common";
const loginIn = ({ params }) => {
  return ajax({
    url: "/api/signup/login",
    method: "post",
    data: params
  });
};
const signup = ({ params }) => {
  return ajax({
    url: "/api/signup/account",
    method: "post",
    data: params
  });
};
const search = ({ params }) => {
  return ajax({
    url: "/api/signup/search",
    method: "get",
    params
  });
};
export default {
  loginIn,
  signup,
  search
};
