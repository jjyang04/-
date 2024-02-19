/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Fun from "./views/fun";
import Login from "./views/doc_login";
import Index from "./views/layout";
// import { notification } from "antd";
// const [__, contextHolder] = notification.useNotification();
// import Search from "./views/search";
// import Detail from "./views/detail";
// import Add from "./views/fn";
// import asd  from '@'
// import Foo from "./views/foo";
// import Layout from "./views/layout";
function App() {
  // eslint-disable-next-line no-useless-constructor
  // useEffect(() => {
  //   navigate("/fun");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const navigate = () => {
    if (localStorage.getItem("Router") && localStorage.getItem("doc_tocken")) {
      return "./index";
    } else {
      return "./login";
    }
  };
  return (
    <>
      {/* {contextHolder} */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={navigate()}></Navigate>}
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/index/*" element={<Index />} />
        </Routes>
      </BrowserRouter>
      {/* <div>12321</div> */}
      {/* <Add /> */}
      {/* {Foo()} */}
      {/* <Foo /> */}
      {/* {Add()} */}
      {/* <div>layout</div> */}
      {/* <Layout /> */}
      {/* <Fun /> */}
    </>
  );
}
// 调用函数,理解形参实参
export default App;
