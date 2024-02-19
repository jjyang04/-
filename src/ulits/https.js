// import axios from "axios";

// const request = axios.create({
//   baseURL: "",
// });

// export default request;

import axios from "axios";

const request = axios.create({
  // baseURL: "http://47.95.13.131:8081",
  timeout: 3000,
});

request.defaults.withCredentials = true;
request.interceptors.request.use((config) => {
  // const { method, url } = config;
  // console.log(config);
  //   const permissions = storejs.get("user_info")?.permissions;
  //   if (permissions.length > 0 && permissions.indexOf(`${method}:${url}`) <= -1) {
  //     return false;
  //   }
  const accessToken = localStorage.getItem("doc_tocken");
  // console.log(accessToken);
  if (accessToken) config.headers.set("Token", `${accessToken}`);
  console.log(config);
  return config;
});
export default request;
