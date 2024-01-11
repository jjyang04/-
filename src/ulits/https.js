// import axios from "axios";

// const request = axios.create({
//   baseURL: "",
// });

// export default request;

import axios from "axios";

const request = axios.create({
  // baseURL: 'http://localhost:3000',
  timeout: 3000,
});

export default request;
